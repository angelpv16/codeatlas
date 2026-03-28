import { useState } from 'react';

interface MiniQuizProps {
  question: string;
  options: string[];
  correctIndex: number;
  lang?: 'en' | 'es';
  nextSlug?: string;
}

export default function MiniQuiz({ question, options, correctIndex, lang = 'en', nextSlug }: MiniQuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const base = import.meta.env.BASE_URL ?? '/codeatlas/';

  const labels = {
    correct: lang === 'es' ? '\u00a1Correcto!' : 'Correct!',
    wrong: lang === 'es' ? 'Int\u00e9ntalo de nuevo' : 'Try again',
    next: lang === 'es' ? 'Siguiente concepto' : 'Next concept',
  };

  function handleSelect(index: number) {
    setSelected(index);
    setIsCorrect(index === correctIndex);
  }

  return (
    <div className="atlas-card my-8">
      <h4 className="text-lg font-semibold text-atlas-text-bright mb-4">{question}</h4>
      <div className="space-y-2">
        {options.map((option, index) => {
          let btnClass = 'w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ';
          if (selected === index) {
            if (isCorrect) {
              btnClass += 'border-green-500/50 bg-green-500/10 text-green-400';
            } else {
              btnClass += 'border-red-500/50 bg-red-500/10 text-red-400 animate-shake';
            }
          } else {
            btnClass += 'border-atlas-border bg-atlas-bg hover:border-atlas-accent/40 text-atlas-text';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={btnClass}
              disabled={isCorrect === true}
            >
              {option}
            </button>
          );
        })}
      </div>

      {isCorrect !== null && (
        <div className={`mt-4 flex items-center justify-between ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
          <span className="font-medium">
            {isCorrect ? labels.correct : labels.wrong}
          </span>
          {isCorrect && nextSlug && (
            <a
              href={`${base}learn/${nextSlug}/`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-atlas-accent text-white text-sm font-medium rounded-lg hover:bg-atlas-accent-hover transition-colors"
            >
              {labels.next}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
