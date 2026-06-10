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
      label: "Email",
      value: profile.contact.email,
      href: emailHref,
      icon: Mail,
      isPlaceholder: !hasEmail
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
      label: "Resume",
      value: resumeUrl.includes("PLACEHOLDER") ? "Placeholder" : "Download",
      href: resumeUrl,
      icon: Download,
      isPlaceholder: false,
      download: true
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
        message: "Message sent. Shubhaang Kataruka will review and respond shortly."
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
    <div className="pb-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Left Side: Content & Links */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-32">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-slate-50">
              Let's talk.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              For recruiters, founders, mentors, and collaborators looking for an AI engineer with strong analytics and full-stack capabilities.
            </p>
          </div>

          <section className="rounded-[1.5rem] border border-black/5 bg-white/60 p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">// Availability</span>
            <h2 className="mt-3 text-2xl font-black text-slate-900 dark:text-slate-50">
              Open to high-context technical work.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {profile.currentStatus}
            </p>
            <div className="mt-6 grid gap-3">
              {[
                { label: "Best fit", value: "AI/ML, RAG, analytics, SQL, full stack", icon: Target },
                { label: "Response context", value: "Role, project, timeline, and expectations", icon: Send }
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-xl border border-black/5 bg-white/80 p-4 dark:border-white/5 dark:bg-black/20"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
                      <Icon aria-hidden="true" size={18} />
                    </span>
                    <div>
                      <p className="text-base font-bold text-slate-900 dark:text-slate-100">{item.label}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4">
            {contactLinks.map((link) => (
              <ContactLinkCard key={link.label} {...link} />
            ))}
          </section>
        </div>

        {/* Right Side: Form */}
        <div className="w-full">
          <ContactForm
            formData={formData}
            status={status}
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
