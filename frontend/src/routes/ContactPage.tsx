import { Download, Github, Linkedin, Mail, Send, Target, Trophy } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { ContactForm, type ContactFormStatus } from "../components/contact/ContactForm";
import { ContactLinkCard } from "../components/contact/ContactLinkCard";
import { frontendEnv, isPlaceholderValue } from "../config/env";
import { profile } from "../data";
import { sendContactMessage, type ContactPayload } from "../services/contactApi";

const initialFormData: ContactPayload = {
  name: "",
  email: "",
  company: "",
  purpose: "",
  message: ""
};

export function ContactPage() {
  const [formData, setFormData] = useState<ContactPayload>(initialFormData);
  const [status, setStatus] = useState<ContactFormStatus>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const resumeUrl = frontendEnv.resumeUrl;
  const hasEmail = !isPlaceholderValue(profile.contact.email);
  const emailHref = hasEmail ? `mailto:${profile.contact.email}` : undefined;

  const contactLinks = [
    {
      label: "Resume",
      value: resumeUrl.includes("PLACEHOLDER") ? "Placeholder file" : "Download PDF",
      href: resumeUrl,
      icon: Download,
      isPlaceholder: false,
      download: true
    },
    {
      label: "LinkedIn",
      value: profile.contact.linkedin,
      href: isPlaceholderValue(profile.contact.linkedin) ? undefined : profile.contact.linkedin,
      icon: Linkedin,
      isPlaceholder: isPlaceholderValue(profile.contact.linkedin)
    },
    {
      label: "GitHub",
      value: profile.contact.github,
      href: isPlaceholderValue(profile.contact.github) ? undefined : profile.contact.github,
      icon: Github,
      isPlaceholder: isPlaceholderValue(profile.contact.github)
    },
    {
      label: "LeetCode",
      value: profile.contact.leetcode,
      href: isPlaceholderValue(profile.contact.leetcode) ? undefined : profile.contact.leetcode,
      icon: Trophy,
      isPlaceholder: isPlaceholderValue(profile.contact.leetcode)
    },
    {
      label: "Email",
      value: profile.contact.email,
      href: emailHref,
      icon: Mail,
      isPlaceholder: !hasEmail
    }
  ];

  const handleChange = useCallback((field: keyof ContactPayload, value: string) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value
    }));
    setStatus({ type: "idle", message: "" });
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });
    abortControllerRef.current?.abort();

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      await sendContactMessage(
        {
          ...formData,
          company: formData.company?.trim() || undefined
        },
        abortController.signal
      );

      setFormData(initialFormData);
      setStatus({
        type: "success",
        message: "Message sent. Shubhaang will have the context needed to respond thoughtfully."
      });
    } catch (error) {
      if (!abortController.signal.aborted) {
        setStatus({
          type: "error",
          message: error instanceof Error ? error.message : "Message could not be sent right now."
        });
      }
    } finally {
      if (!abortController.signal.aborted) {
        setIsSubmitting(false);
      }
    }
  }, [formData]);

  return (
    <div className="space-y-12 pb-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-slate-50">
          Start a focused conversation.
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-slate-600 dark:text-slate-400">
          For recruiters, founders, mentors, collaborators, and teams looking for a CS & AI student with AI, analytics, full-stack, and business instincts.
        </p>
      </div>

      <section className="grid gap-8 lg:grid-cols-[0.6fr_0.4fr]">
        <div className="space-y-6">
          <ContactForm
            formData={formData}
            status={status}
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-black/5 bg-white/60 p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8">
            <span className="text-sm font-bold uppercase tracking-widest text-slate-500">Availability</span>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-50">
              Open to high-context technical work.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {profile.currentStatus}
            </p>
            <div className="mt-6 grid gap-4">
              {[
                { label: "Best fit", value: "AI/ML, RAG, analytics, SQL, full stack", icon: Target },
                { label: "Response context", value: "Role, project, timeline, and expectations", icon: Send }
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white/80 p-4 dark:border-white/5 dark:bg-black/20"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400">
                      <Icon aria-hidden="true" size={18} />
                    </span>
                    <div>
                      <p className="text-base font-bold text-slate-900 dark:text-slate-100">{item.label}</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid gap-4">
            {contactLinks.map((link) => (
              <ContactLinkCard key={link.label} {...link} />
            ))}
          </section>
        </aside>
      </section>
    </div>
  );
}
