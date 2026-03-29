import { useState } from 'react';

interface Concept {
  slug: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  section: 'fundamentals' | 'dsa';
  estimatedMinutes: number;
  order: number;
}

interface ConceptFilterProps {
  concepts: Concept[];
  lang?: 'en' | 'es';
}

const levelColors = {
  beginner: 'bg-atlas-secondary/10 text-atlas-secondary',
  intermediate: 'bg-atlas-accent/10 text-atlas-accent',
  advanced: 'bg-purple-500/10 text-purple-400',
};

const levelLabels = {
  en: { all: 'All', beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
  es: { all: 'Todos', beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' },
};

const sectionLabels = {
  en: { all: 'All', fundamentals: 'Fundamentals', dsa: 'DSA' },
  es: { all: 'Todo', fundamentals: 'Fundamentos', dsa: 'DSA' },
};

export default function ConceptFilter({ concepts, lang = 'en' }: ConceptFilterProps) {
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const labels = levelLabels[lang];
  const secLabels = sectionLabels[lang];
  const base = import.meta.env.BASE_URL ?? '/codeatlas/';

  const filtered = concepts.filter((c) => {
    const matchLevel = levelFilter === 'all' || c.level === levelFilter;
    const matchSection = sectionFilter === 'all' || c.section === sectionFilter;
    return matchLevel && matchSection;
  });

  const readTimeLabel = lang === 'es' ? 'min de lectura' : 'min read';

  const levelFilters = [
    { key: 'all', label: labels.all },
    { key: 'beginner', label: labels.beginner },
    { key: 'intermediate', label: labels.intermediate },
    { key: 'advanced', label: labels.advanced },
  ];

  const sectionFilters = [
    { key: 'all', label: secLabels.all },
    { key: 'fundamentals', label: secLabels.fundamentals },
    { key: 'dsa', label: secLabels.dsa },
  ];

  const btnClass = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      active
        ? 'bg-atlas-accent text-white'
        : 'bg-atlas-surface border border-atlas-border text-atlas-muted hover:border-atlas-accent/40 hover:text-atlas-text-bright'
    }`;

  return (
    <div>
      {/* Section filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {sectionFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setSectionFilter(f.key)}
            className={btnClass(sectionFilter === f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Level filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {levelFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setLevelFilter(f.key)}
            className={btnClass(levelFilter === f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Concept grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered
          .sort((a, b) => a.order - b.order)
          .map((concept) => {
            const displayTitle = lang === 'es' ? concept.titleEs : concept.title;
            const displayDesc = lang === 'es' ? concept.descriptionEs : concept.description;
            const badgeClass = levelColors[concept.level];
            const levelLabel = labels[concept.level as keyof typeof labels] || concept.level;

            return (
              <a
                key={concept.slug}
                href={`${base}learn/${concept.slug}/`}
                className="group bg-atlas-surface border border-atlas-border rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-atlas-accent/40 block"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
                    {levelLabel}
                  </span>
                  <span className="text-xs text-atlas-muted">
                    {concept.estimatedMinutes} {readTimeLabel}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-atlas-text-bright mb-2 group-hover:text-atlas-accent transition-colors">
                  {displayTitle}
                </h3>
                <p className="text-sm text-atlas-muted leading-relaxed mb-4">
                  {displayDesc}
                </p>
                <span className="inline-flex items-center text-sm text-atlas-accent font-medium">
                  <span>{lang === 'es' ? 'Leer' : 'Read'}</span>
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            );
          })}
      </div>
    </div>
  );
}
