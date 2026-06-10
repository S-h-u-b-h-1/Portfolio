import { LoaderCircle, Send, ShieldCheck, TriangleAlert } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import type { ContactPayload } from "../../services/contactApi";

export type ContactFormStatus =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

type ContactFormProps = {
  formData: ContactPayload;
  status: ContactFormStatus;
  isSubmitting: boolean;
  onChange: (field: keyof ContactPayload, value: string) => void;
  onSubmit: () => void;
};

const purposeOptions = [
  "Internship opportunity",
  "AI/ML role",
  "Data analytics role",
  "Full-stack freelance work",
  "Business-tech collaboration",
  "Mentorship / networking"
] as const;

export function ContactForm({
  formData,
  status,
  isSubmitting,
  onChange,
  onSubmit
}: ContactFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const handleInputChange =
    (field: keyof ContactPayload) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      onChange(field, event.target.value);
    };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-black/5 bg-white/60 p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Name</span>
          <input
            value={formData.name}
            onChange={handleInputChange("name")}
            required
            maxLength={120}
            autoComplete="name"
            className="mt-2 h-14 w-full rounded-2xl border border-black/5 bg-white/80 px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent-cyan/50 focus:bg-white focus:ring-4 focus:ring-accent-cyan/10 dark:border-white/10 dark:bg-black/20 dark:text-slate-100 dark:focus:border-accent-cyan/50 dark:focus:bg-black/40"
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Email</span>
          <input
            value={formData.email}
            onChange={handleInputChange("email")}
            required
            maxLength={254}
            type="email"
            autoComplete="email"
            className="mt-2 h-14 w-full rounded-2xl border border-black/5 bg-white/80 px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent-cyan/50 focus:bg-white focus:ring-4 focus:ring-accent-cyan/10 dark:border-white/10 dark:bg-black/20 dark:text-slate-100 dark:focus:border-accent-cyan/50 dark:focus:bg-black/40"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Company (Optional)</span>
          <input
            value={formData.company ?? ""}
            onChange={handleInputChange("company")}
            maxLength={160}
            autoComplete="organization"
            className="mt-2 h-14 w-full rounded-2xl border border-black/5 bg-white/80 px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent-cyan/50 focus:bg-white focus:ring-4 focus:ring-accent-cyan/10 dark:border-white/10 dark:bg-black/20 dark:text-slate-100 dark:focus:border-accent-cyan/50 dark:focus:bg-black/40"
            placeholder="Organization"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Purpose</span>
          <select
            value={formData.purpose}
            onChange={handleInputChange("purpose")}
            required
            className="mt-2 h-14 w-full rounded-2xl border border-black/5 bg-white/80 px-4 text-base text-slate-900 outline-none transition focus:border-accent-cyan/50 focus:bg-white focus:ring-4 focus:ring-accent-cyan/10 dark:border-white/10 dark:bg-black/20 dark:text-slate-100 dark:focus:border-accent-cyan/50 dark:focus:bg-black/40"
          >
            <option value="">Select purpose</option>
            {purposeOptions.map((purpose) => (
              <option key={purpose} value={purpose}>
                {purpose}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-6 block">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</span>
        <textarea
          value={formData.message}
          onChange={handleInputChange("message")}
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          className="mt-2 w-full resize-y rounded-2xl border border-black/5 bg-white/80 px-4 py-4 text-base leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent-cyan/50 focus:bg-white focus:ring-4 focus:ring-accent-cyan/10 dark:border-white/10 dark:bg-black/20 dark:text-slate-100 dark:focus:border-accent-cyan/50 dark:focus:bg-black/40"
          placeholder="Share the role, project, collaboration idea, or what you would like to discuss."
        />
      </label>

      {status.type !== "idle" ? (
        <div
          className={`mt-6 flex items-start gap-3 rounded-2xl border p-4 text-base leading-relaxed ${
            status.type === "success"
              ? "border-accent-emerald/20 bg-accent-emerald/10 text-emerald-800 dark:border-accent-emerald/30 dark:bg-accent-emerald/10 dark:text-accent-emerald"
              : "border-red-500/20 bg-red-500/10 text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300"
          }`}
          role={status.type === "error" ? "alert" : "status"}
        >
          {status.type === "success" ? (
            <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0" size={20} />
          ) : (
            <TriangleAlert aria-hidden="true" className="mt-0.5 shrink-0" size={20} />
          )}
          <span>{status.message}</span>
        </div>
      ) : null}

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-accent-cyan bg-accent-cyan px-8 py-3 text-base font-bold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none sm:w-auto"
        >
          {isSubmitting ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" size={20} />
          ) : (
            <Send aria-hidden="true" size={20} />
          )}
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
}
