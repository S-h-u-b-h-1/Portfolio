import { Download, Github, Linkedin, Mail, Send, Target, Trophy } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { ContactForm, type ContactFormStatus } from "../components/contact/ContactForm";
import { ContactLinkCard } from "../components/contact/ContactLinkCard";
import { SectionHeader } from "../components/portfolio/SectionHeader";
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
    <div className="space-y-10 pb-8">
      <SectionHeader
        eyebrow="// contact.channel"
        title="Start a focused conversation."
        description="For recruiters, founders, mentors, collaborators, and teams looking for a CS & AI student with AI, analytics, full-stack, and business instincts."
        headingLevel="h1"
      />

      <section className="grid gap-6 lg:grid-cols-[0.62fr_0.38fr]">
        <div className="space-y-6">
          <ContactForm
            formData={formData}
            status={status}
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border border-border bg-white/[0.045] p-5 backdrop-blur light:bg-white/85">
            <p className="font-mono text-sm text-accent-cyan">// availability.signal</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-50 light:text-slate-950">
              Open to high-context technical work.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300 light:text-slate-700">
              {profile.currentStatus}
            </p>
            <div className="mt-5 grid gap-3">
              {[
                { label: "Best fit", value: "AI/ML, RAG, analytics, SQL, full stack", icon: Target },
                { label: "Response context", value: "Role, project, timeline, and expectations", icon: Send }
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex gap-3 rounded-lg border border-white/10 bg-slate-950/35 p-3 light:border-slate-950/10 light:bg-slate-950/[0.035]"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-emerald/10 text-accent-emerald">
                      <Icon aria-hidden="true" size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-100 light:text-slate-950">{item.label}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500 light:text-slate-600">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid gap-3">
            {contactLinks.map((link) => (
              <ContactLinkCard key={link.label} {...link} />
            ))}
          </section>
        </aside>
      </section>
    </div>
  );
}
