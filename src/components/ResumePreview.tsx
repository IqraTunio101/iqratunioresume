import type { ResumeData, TemplateId } from "@/lib/resume-types";

function ContactLine({ data, className }: { data: ResumeData; className?: string }) {
  const parts = [data.email, data.phone, data.location, data.website].filter(Boolean);
  return (
    <p className={className}>
      {parts.map((p, i) => (
        <span key={p}>
          {i > 0 && <span className="mx-1.5 opacity-50">·</span>}
          {p}
        </span>
      ))}
    </p>
  );
}

function SectionTitle({ children, className }: { children: string; className?: string }) {
  return <h2 className={className}>{children}</h2>;
}

export function ResumePreview({
  data,
  template,
}: {
  data: ResumeData;
  template: TemplateId;
}) {
  const hasExperience = data.experience.some((e) => e.role || e.company);
  const hasEducation = data.education.some((e) => e.degree || e.school);

  if (template === "modern") {
    return (
      <div
        id="resume-sheet"
        className="mx-auto flex aspect-[210/297] w-full max-w-[794px] bg-paper text-paper-foreground shadow-2xl"
      >
        <aside className="flex w-[32%] flex-col gap-6 bg-primary p-7 text-primary-foreground">
          <div>
            <h1 className="font-display text-2xl font-semibold leading-tight">
              {data.name || "Your Name"}
            </h1>
            <p className="mt-1 text-sm opacity-85">{data.title || "Job Title"}</p>
          </div>
          <div className="space-y-1.5 text-[11px] leading-relaxed opacity-90">
            {data.email && <p className="break-all">{data.email}</p>}
            {data.phone && <p>{data.phone}</p>}
            {data.location && <p>{data.location}</p>}
            {data.website && <p className="break-all">{data.website}</p>}
          </div>
          {data.skills.length > 0 && (
            <div>
              <SectionTitle className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-80">
                Skills
              </SectionTitle>
              <ul className="space-y-1 text-[11px]">
                {data.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}
          {hasEducation && (
            <div>
              <SectionTitle className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-80">
                Education
              </SectionTitle>
              {data.education.map((e) => (
                <div key={e.id} className="mb-3 text-[11px]">
                  <p className="font-semibold">{e.degree}</p>
                  <p className="opacity-85">{e.school}</p>
                  <p className="opacity-70">
                    {e.start}
                    {e.start && e.end ? " — " : ""}
                    {e.end}
                  </p>
                </div>
              ))}
            </div>
          )}
        </aside>
        <main className="flex-1 p-8">
          {data.summary && (
            <section className="mb-6">
              <SectionTitle className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Profile
              </SectionTitle>
              <p className="text-[12px] leading-relaxed text-paper-muted">{data.summary}</p>
            </section>
          )}
          {hasExperience && (
            <section>
              <SectionTitle className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Experience
              </SectionTitle>
              {data.experience.map((e) => (
                <div key={e.id} className="mb-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[13px] font-semibold">{e.role}</p>
                    <p className="shrink-0 text-[10px] text-paper-muted">
                      {e.start}
                      {e.start && e.end ? " — " : ""}
                      {e.end}
                    </p>
                  </div>
                  <p className="text-[11px] font-medium text-primary">{e.company}</p>
                  {e.description && (
                    <p className="mt-1 text-[11.5px] leading-relaxed text-paper-muted">
                      {e.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    );
  }

  if (template === "minimal") {
    return (
      <div
        id="resume-sheet"
        className="mx-auto aspect-[210/297] w-full max-w-[794px] bg-paper p-12 text-paper-foreground shadow-2xl"
      >
        <header className="mb-8">
          <h1 className="font-resume text-3xl font-semibold tracking-tight">
            {data.name || "Your Name"}
          </h1>
          <p className="mt-1 text-sm text-paper-muted">{data.title || "Job Title"}</p>
          <ContactLine data={data} className="mt-3 text-[11px] text-paper-muted" />
        </header>
        {data.summary && (
          <section className="mb-7">
            <p className="font-resume text-[13px] leading-relaxed">{data.summary}</p>
          </section>
        )}
        {hasExperience && (
          <section className="mb-7">
            <SectionTitle className="mb-3 border-b border-border pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-paper-muted">
              Experience
            </SectionTitle>
            {data.experience.map((e) => (
              <div key={e.id} className="mb-4 grid grid-cols-[110px_1fr] gap-4">
                <p className="text-[10.5px] text-paper-muted">
                  {e.start}
                  {e.start && e.end ? " — " : ""}
                  {e.end}
                </p>
                <div>
                  <p className="text-[12.5px] font-semibold">
                    {e.role}
                    {e.role && e.company ? ", " : ""}
                    <span className="font-normal">{e.company}</span>
                  </p>
                  {e.description && (
                    <p className="mt-1 text-[11.5px] leading-relaxed text-paper-muted">
                      {e.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}
        {hasEducation && (
          <section className="mb-7">
            <SectionTitle className="mb-3 border-b border-border pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-paper-muted">
              Education
            </SectionTitle>
            {data.education.map((e) => (
              <div key={e.id} className="mb-2 grid grid-cols-[110px_1fr] gap-4">
                <p className="text-[10.5px] text-paper-muted">
                  {e.start}
                  {e.start && e.end ? " — " : ""}
                  {e.end}
                </p>
                <p className="text-[12.5px]">
                  <span className="font-semibold">{e.degree}</span>
                  {e.degree && e.school ? ", " : ""}
                  {e.school}
                </p>
              </div>
            ))}
          </section>
        )}
        {data.skills.length > 0 && (
          <section>
            <SectionTitle className="mb-2 border-b border-border pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-paper-muted">
              Skills
            </SectionTitle>
            <p className="text-[11.5px] text-paper-muted">{data.skills.join(" · ")}</p>
          </section>
        )}
      </div>
    );
  }

  // classic
  return (
    <div
      id="resume-sheet"
      className="mx-auto aspect-[210/297] w-full max-w-[794px] bg-paper p-10 text-paper-foreground shadow-2xl"
    >
      <header className="mb-6 border-b-2 border-foreground pb-4 text-center">
        <h1 className="font-resume text-3xl font-bold tracking-wide uppercase">
          {data.name || "Your Name"}
        </h1>
        <p className="mt-1 text-[13px] tracking-[0.14em] uppercase text-paper-muted">
          {data.title || "Job Title"}
        </p>
        <ContactLine data={data} className="mt-2 text-[11px] text-paper-muted" />
      </header>
      {data.summary && (
        <section className="mb-5">
          <SectionTitle className="mb-1.5 text-[12px] font-bold uppercase tracking-[0.16em]">
            Summary
          </SectionTitle>
          <p className="font-resume text-[12px] leading-relaxed">{data.summary}</p>
        </section>
      )}
      {hasExperience && (
        <section className="mb-5">
          <SectionTitle className="mb-2 text-[12px] font-bold uppercase tracking-[0.16em]">
            Experience
          </SectionTitle>
          {data.experience.map((e) => (
            <div key={e.id} className="mb-3.5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-resume text-[13px] font-bold">{e.role}</p>
                <p className="shrink-0 text-[10.5px] italic text-paper-muted">
                  {e.start}
                  {e.start && e.end ? " — " : ""}
                  {e.end}
                </p>
              </div>
              <p className="text-[11.5px] italic text-paper-muted">{e.company}</p>
              {e.description && (
                <p className="mt-1 text-[11.5px] leading-relaxed">{e.description}</p>
              )}
            </div>
          ))}
        </section>
      )}
      {hasEducation && (
        <section className="mb-5">
          <SectionTitle className="mb-2 text-[12px] font-bold uppercase tracking-[0.16em]">
            Education
          </SectionTitle>
          {data.education.map((e) => (
            <div key={e.id} className="mb-2 flex items-baseline justify-between gap-3">
              <p className="text-[12px]">
                <span className="font-resume font-bold">{e.degree}</span>
                {e.degree && e.school ? " — " : ""}
                {e.school}
              </p>
              <p className="shrink-0 text-[10.5px] italic text-paper-muted">
                {e.start}
                {e.start && e.end ? " — " : ""}
                {e.end}
              </p>
            </div>
          ))}
        </section>
      )}
      {data.skills.length > 0 && (
        <section>
          <SectionTitle className="mb-1.5 text-[12px] font-bold uppercase tracking-[0.16em]">
            Skills
          </SectionTitle>
          <p className="text-[11.5px]">{data.skills.join("  •  ")}</p>
        </section>
      )}
    </div>
  );
}
