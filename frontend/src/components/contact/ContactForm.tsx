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
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-white/[0.045] p-5 backdrop-blur light:bg-white/85">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-200 light:text-slate-800">Name</span>
          <input
            value={formData.name}
            onChange={handleInputChange("name")}
            required
            maxLength={120}
            autoComplete="name"
            className="h-12 rounded-lg border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-accent-cyan/70 focus:ring-2 focus:ring-accent-cyan/20 light:border-slate-950/10 light:bg-white light:text-slate-950"
            placeholder="Your name"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-200 light:text-slate-800">Email</span>
          <input
            value={formData.email}
            onChange={handleInputChange("email")}
            required
            maxLength={254}
            type="email"
            autoComplete="email"
            className="h-12 rounded-lg border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-accent-cyan/70 focus:ring-2 focus:ring-accent-cyan/20 light:border-slate-950/10 light:bg-white light:text-slate-950"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-200 light:text-slate-800">Company</span>
          <input
            value={formData.company ?? ""}
            onChange={handleInputChange("company")}
            maxLength={160}
            autoComplete="organization"
            className="h-12 rounded-lg border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-accent-cyan/70 focus:ring-2 focus:ring-accent-cyan/20 light:border-slate-950/10 light:bg-white light:text-slate-950"
            placeholder="Company or organization"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-200 light:text-slate-800">Purpose</span>
          <select
            value={formData.purpose}
            onChange={handleInputChange("purpose")}
            required
            className="h-12 rounded-lg border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-100 outline-none transition focus:border-accent-cyan/70 focus:ring-2 focus:ring-accent-cyan/20 light:border-slate-950/10 light:bg-white light:text-slate-950"
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

      <label className="mt-4 grid gap-2">
        <span className="text-sm font-medium text-slate-200 light:text-slate-800">Message</span>
        <textarea
          value={formData.message}
          onChange={handleInputChange("message")}
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          className="resize-none rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-accent-cyan/70 focus:ring-2 focus:ring-accent-cyan/20 light:border-slate-950/10 light:bg-white light:text-slate-950"
          placeholder="Share the role, project, collaboration idea, or what you would like to discuss."
        />
      </label>

      {status.type !== "idle" ? (
        <div
          className={`mt-4 flex gap-3 rounded-lg border px-4 py-3 text-sm leading-6 ${
            status.type === "success"
              ? "border-accent-emerald/25 bg-accent-emerald/10 text-accent-emerald"
              : "border-red-400/25 bg-red-400/10 text-red-200 light:text-red-700"
          }`}
          role={status.type === "error" ? "alert" : "status"}
        >
          {status.type === "success" ? (
            <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0" size={17} />
          ) : (
            <TriangleAlert aria-hidden="true" className="mt-0.5 shrink-0" size={17} />
          )}
          <span>{status.message}</span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-accent-cyan bg-accent-cyan px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          <LoaderCircle aria-hidden="true" className="animate-spin" size={17} />
        ) : (
          <Send aria-hidden="true" size={17} />
        )}
        {isSubmitting ? "Sending message" : "Send message"}
      </button>
    </form>
  );
}

