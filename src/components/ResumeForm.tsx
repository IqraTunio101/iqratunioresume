import { Plus, Trash2 } from "lucide-react";
import { uid, type ResumeData } from "@/lib/resume-types";

const inputCls =
  "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40";
const labelCls = "mb-1 block text-xs font-medium text-muted-foreground";

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {textarea ? (
        <textarea
          className={`${inputCls} min-h-24 resize-y`}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={inputCls}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-base font-semibold">{title}</h2>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

const addBtnCls =
  "inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary";

export function ResumeForm({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (d: ResumeData) => void;
}) {
  const set = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) =>
    onChange({ ...data, [key]: value });

  const updateExp = (id: string, patch: Partial<ResumeData["experience"][number]>) =>
    set(
      "experience",
      data.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );
  const updateEdu = (id: string, patch: Partial<ResumeData["education"][number]>) =>
    set(
      "education",
      data.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );

  return (
    <div className="space-y-5">
      <Section title="Contact">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Full name" value={data.name} onChange={(v) => set("name", v)} placeholder="Ayesha Khan" />
          <Field label="Job title" value={data.title} onChange={(v) => set("title", v)} placeholder="Product Designer" />
          <Field label="Email" value={data.email} onChange={(v) => set("email", v)} placeholder="you@email.com" />
          <Field label="Phone" value={data.phone} onChange={(v) => set("phone", v)} placeholder="+92 300 0000000" />
          <Field label="Location" value={data.location} onChange={(v) => set("location", v)} placeholder="Karachi, Pakistan" />
          <Field label="Website / LinkedIn" value={data.website} onChange={(v) => set("website", v)} placeholder="yoursite.com" />
        </div>
      </Section>

      <Section title="Summary">
        <Field
          label="Professional summary"
          value={data.summary}
          onChange={(v) => set("summary", v)}
          placeholder="Two or three sentences about who you are and what you do best."
          textarea
        />
      </Section>

      <Section
        title="Experience"
        action={
          <button
            type="button"
            className={addBtnCls}
            onClick={() =>
              set("experience", [
                ...data.experience,
                { id: uid(), role: "", company: "", start: "", end: "", description: "" },
              ])
            }
          >
            <Plus className="size-3.5" /> Add role
          </button>
        }
      >
        {data.experience.map((e, i) => (
          <div key={e.id} className="space-y-3 rounded-lg border border-border bg-secondary/50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground">Role {i + 1}</p>
              {data.experience.length > 1 && (
                <button
                  type="button"
                  aria-label="Remove role"
                  className="text-muted-foreground transition-colors hover:text-destructive"
                  onClick={() => set("experience", data.experience.filter((x) => x.id !== e.id))}
                >
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Job title" value={e.role} onChange={(v) => updateExp(e.id, { role: v })} />
              <Field label="Company" value={e.company} onChange={(v) => updateExp(e.id, { company: v })} />
              <Field label="Start" value={e.start} onChange={(v) => updateExp(e.id, { start: v })} placeholder="2021" />
              <Field label="End" value={e.end} onChange={(v) => updateExp(e.id, { end: v })} placeholder="Present" />
            </div>
            <Field
              label="What you did"
              value={e.description}
              onChange={(v) => updateExp(e.id, { description: v })}
              placeholder="Key responsibilities and achievements, with numbers where possible."
              textarea
            />
          </div>
        ))}
      </Section>

      <Section
        title="Education"
        action={
          <button
            type="button"
            className={addBtnCls}
            onClick={() =>
              set("education", [
                ...data.education,
                { id: uid(), degree: "", school: "", start: "", end: "" },
              ])
            }
          >
            <Plus className="size-3.5" /> Add education
          </button>
        }
      >
        {data.education.map((e, i) => (
          <div key={e.id} className="space-y-3 rounded-lg border border-border bg-secondary/50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground">Education {i + 1}</p>
              {data.education.length > 1 && (
                <button
                  type="button"
                  aria-label="Remove education"
                  className="text-muted-foreground transition-colors hover:text-destructive"
                  onClick={() => set("education", data.education.filter((x) => x.id !== e.id))}
                >
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Degree" value={e.degree} onChange={(v) => updateEdu(e.id, { degree: v })} />
              <Field label="School" value={e.school} onChange={(v) => updateEdu(e.id, { school: v })} />
              <Field label="Start" value={e.start} onChange={(v) => updateEdu(e.id, { start: v })} />
              <Field label="End" value={e.end} onChange={(v) => updateEdu(e.id, { end: v })} />
            </div>
          </div>
        ))}
      </Section>

      <Section title="Skills">
        <Field
          label="Skills (comma separated)"
          value={data.skills.join(", ")}
          onChange={(v) =>
            set(
              "skills",
              v.split(",").map((s) => s.trim()).filter(Boolean),
            )
          }
          placeholder="Leadership, Figma, SQL, Public speaking"
          textarea
        />
      </Section>
    </div>
  );
}
