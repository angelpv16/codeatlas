import { useState } from 'react';

interface Concept {
  slug: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  section: 'fundamentals' | 'dsa' | 'algorithms';
  estimatedMinutes: number;
  order: number;
}

interface ConceptFilterProps {
  concepts: Concept[];
  lang?: 'en' | 'es';
}

const levelLabels = {
  en: { all: 'All', beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
  es: { all: 'Todos', beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' },
};

const sectionLabels = {
  en: { all: 'All', fundamentals: 'Fundamentals', dsa: 'DSA', algorithms: 'Algorithms' },
  es: { all: 'Todo', fundamentals: 'Fundamentos', dsa: 'DSA', algorithms: 'Algoritmos' },
};

const badgeClasses: Record<string, string> = {
  beginner: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  intermediate: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
  advanced: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
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

  const tabClass = (active: boolean) =>
    `px-3 py-1.5 text-sm font-medium transition-colors duration-200 border-b-2 ${
      active
        ? 'text-atlas-accent border-atlas-accent'
        : 'text-atlas-muted border-transparent hover:text-atlas-text'
    }`;

  const sectionFilters = [
    { key: 'all', label: secLabels.all },
    { key: 'fundamentals', label: secLabels.fundamentals },
    { key: 'dsa', label: secLabels.dsa },
    { key: 'algorithms', label: secLabels.algorithms },
  ];

  const levelFilters = [
    { key: 'all', label: labels.all },
    { key: 'beginner', label: labels.beginner },
    { key: 'intermediate', label: labels.intermediate },
    { key: 'advanced', label: labels.advanced },
  ];

  return (
    <div>
      {/* Filter rows */}
      <div className="flex flex-wrap items-center gap-6 mb-4 border-b border-atlas-line pb-0">
        {sectionFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setSectionFilter(f.key)}
            className={tabClass(sectionFilter === f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-10">
        {levelFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setLevelFilter(f.key)}
            className={`px-3 py-1 rounded-md text-xs font-mono transition-colors duration-200 ${
              levelFilter === f.key
                ? 'bg-atlas-accent/10 text-atlas-accent'
                : 'text-atlas-muted hover:text-atlas-text'
            }`}
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
            const badgeClass = badgeClasses[concept.level] || '';
            const levelLabel = labels[concept.level as keyof typeof labels] || concept.level;
            const sectionTag = concept.section === 'dsa' ? 'DSA' : concept.section === 'algorithms' ? (lang === 'es' ? 'Algoritmos' : 'Algorithms') : (lang === 'es' ? 'Fundamentos' : 'Fundamentals');

            return (
              <a
                key={concept.slug}
                href={`${base}learn/${concept.slug}/`}
                className="group block bg-atlas-surface border border-atlas-border rounded-xl p-5 transition-all duration-200 hover:border-atlas-border-2 hover:bg-atlas-surface-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono ${badgeClass}`}>
                    {levelLabel}
                  </span>
                  <span className="text-xs text-atlas-muted font-mono">
                    {concept.estimatedMinutes} min
                  </span>
                </div>
                <h3 className="text-base font-medium text-atlas-text mb-2 group-hover:text-atlas-accent transition-colors duration-200">
                  {displayTitle}
                </h3>
                <p className="text-sm text-atlas-muted leading-relaxed line-clamp-2 mb-4">
                  {displayDesc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-atlas-muted font-mono opacity-60">
                    {sectionTag}
                  </span>
                  <svg className="w-4 h-4 text-atlas-muted group-hover:text-atlas-accent group-hover:translate-x-0.5 transition-all duration-200" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
}
