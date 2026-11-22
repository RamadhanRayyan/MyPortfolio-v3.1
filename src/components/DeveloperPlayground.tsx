import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { CornerDownLeft, RotateCcw } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../utils/language';
import {
  PRIMARY_TERMINAL_COMMANDS,
  executeTerminalCommand,
  tabCompleteCommand,
  type TerminalOutputLine,
} from '../utils/terminal';

interface TerminalEntry {
  id: number;
  command: string;
  lines: TerminalOutputLine[];
}

function getInitialEntries(lang: Language): TerminalEntry[] {
  const initial = executeTerminalCommand('help', lang);
  return [
    {
      id: 1,
      command: 'help',
      lines: initial.lines,
    },
  ];
}

interface DeveloperPlaygroundProps {
  lang: Language;
}

export function DeveloperPlayground({ lang }: DeveloperPlaygroundProps) {
  const [entries, setEntries] = useState<TerminalEntry[]>(() =>
    getInitialEntries(lang),
  );
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>(['help']);
  const [historyCursor, setHistoryCursor] = useState<number>(-1);
  const [activeTypingId, setActiveTypingId] = useState<number | null>(null);
  const [typedCharBudget, setTypedCharBudget] = useState<number>(Number.MAX_SAFE_INTEGER);

  const nextIdRef = useRef(2);
  const logContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const t = TRANSLATIONS[lang].playground;

  // Keep already displayed terminal outputs synchronized when switching EN <-> ID
  useEffect(() => {
    setEntries((prev) =>
      prev.map((entry) => {
        const refreshed = executeTerminalCommand(
          entry.command === '(empty)' ? '' : entry.command,
          lang,
        );
        return {
          ...entry,
          lines: refreshed.lines,
        };
      }),
    );
    setActiveTypingId(null);
    setTypedCharBudget(Number.MAX_SAFE_INTEGER);
  }, [lang]);

  // Smooth, lightweight typewriter reveal for the latest command entry
  useEffect(() => {
    if (activeTypingId === null) return;
    const activeEntry = entries.find((e) => e.id === activeTypingId);
    if (!activeEntry) {
      setActiveTypingId(null);
      return;
    }

    const totalChars = activeEntry.lines.reduce((acc, line) => acc + line.text.length, 0);
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || totalChars === 0) {
      setTypedCharBudget(totalChars);
      setActiveTypingId(null);
      return;
    }

    let current = 0;
    const step = Math.max(4, Math.ceil(totalChars / 22));
    const timer = window.setInterval(() => {
      current += step;
      if (current >= totalChars) {
        setTypedCharBudget(totalChars);
        setActiveTypingId(null);
        window.clearInterval(timer);
      } else {
        setTypedCharBudget(current);
      }
    }, 18);

    return () => window.clearInterval(timer);
  }, [activeTypingId, entries]);

  // Keep latest output scrolled cleanly into view inside the terminal container
  useEffect(() => {
    const el = logContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [entries, typedCharBudget]);

  const runCommand = (rawCommand: string) => {
    const result = executeTerminalCommand(rawCommand, lang);

    if (result.command) {
      setHistory((prev) => [...prev, result.command]);
      setHistoryCursor(-1);
    }

    if (result.action === 'clear') {
      setEntries([]);
      setActiveTypingId(null);
      setTypedCharBudget(0);
      setInputValue('');
      return;
    }

    const id = nextIdRef.current++;
    setEntries((prev) => [
      ...prev.slice(-11),
      {
        id,
        command: result.command || '(empty)',
        lines: result.lines,
      },
    ]);
    setTypedCharBudget(0);
    setActiveTypingId(id);
    setInputValue('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(inputValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setInputValue(tabCompleteCommand(inputValue));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyCursor === -1 ? history.length - 1 : Math.max(0, historyCursor - 1);
      setHistoryCursor(nextIndex);
      setInputValue(history[nextIndex]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyCursor === -1) return;
      if (historyCursor >= history.length - 1) {
        setHistoryCursor(-1);
        setInputValue('');
      } else {
        const nextIndex = historyCursor + 1;
        setHistoryCursor(nextIndex);
        setInputValue(history[nextIndex]);
      }
    }
  };

  const renderLines = (entry: TerminalEntry) => {
    const isTyping = entry.id === activeTypingId;
    let remaining = isTyping ? typedCharBudget : Number.MAX_SAFE_INTEGER;

    return entry.lines.map((line, index) => {
      if (remaining <= 0) return null;
      const visibleText = line.text.slice(0, remaining);
      remaining -= line.text.length;

      const toneClass =
        line.tone === 'accent'
          ? 'text-[#0F766E] dark:text-[#2DD4BF] font-medium'
          : line.tone === 'error'
            ? 'text-red-600 dark:text-red-400'
            : line.tone === 'muted'
              ? 'text-neutral-500 dark:text-neutral-400'
              : 'text-[#171717] dark:text-neutral-200';

      if (line.href && visibleText.length === line.text.length) {
        return (
          <div key={`${entry.id}-${index}`} className="leading-relaxed">
            <a
              href={line.href}
              target={line.external ? '_blank' : undefined}
              rel={line.external ? 'noopener noreferrer' : undefined}
              className={`${toneClass} underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-[#0F766E] hover:decoration-[#0F766E] dark:decoration-neutral-700 dark:hover:text-[#2DD4BF] dark:hover:decoration-[#2DD4BF]`}
            >
              {visibleText}
            </a>
          </div>
        );
      }

      return (
        <div key={`${entry.id}-${index}`} className={`leading-relaxed ${toneClass}`}>
          {visibleText}
        </div>
      );
    });
  };

  return (
    <section
      id="playground"
      aria-labelledby="playground-heading"
      className="scroll-mt-14 border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Editorial context */}
          <div className="lg:col-span-4">
            <h2
              id="playground-heading"
              className="font-display text-2xl font-semibold tracking-tight text-[#171717] sm:text-3xl dark:text-[#F5F5F5]"
            >
              {t.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {t.description}
            </p>
            <p className="mt-4 font-mono text-xs text-neutral-500 dark:text-neutral-400">
              {t.tip}
            </p>
          </div>

          {/* Right column: Terminal surface */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-[2px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#151515]">
              {/* Minimal terminal bar */}
              <div className="flex items-center justify-between border-b border-neutral-200 bg-[#F5F5F5] px-4 py-2.5 dark:border-neutral-800 dark:bg-[#1A1A1A]">
                <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
                  rayy@semarang:~
                </span>
                <button
                  type="button"
                  onClick={() => runCommand('clear')}
                  aria-label={t.clearAria}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-500 transition-colors hover:text-[#171717] dark:text-neutral-400 dark:hover:text-[#F5F5F5]"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  <span>{t.clearLabel}</span>
                </button>
              </div>

              {/* Scrollable output log */}
              <div
                ref={logContainerRef}
                role="log"
                aria-live="polite"
                aria-label={t.outputAria}
                onClick={() => inputRef.current?.focus()}
                className="h-72 overflow-y-auto px-4 py-4 font-mono text-xs sm:h-80 sm:px-5 sm:text-[13px]"
              >
                {entries.length === 0 ? (
                  <p className="text-neutral-500 dark:text-neutral-400">
                    {t.clearedPrefix}{' '}
                    <span className="text-[#0F766E] dark:text-[#2DD4BF]">help</span>{' '}
                    {t.clearedSuffix}
                  </p>
                ) : (
                  <div className="space-y-4">
                    {entries.map((entry) => (
                      <div key={entry.id} className="space-y-1">
                        <div className="flex items-center gap-2 text-[#171717] dark:text-[#F5F5F5]">
                          <span
                            aria-hidden="true"
                            className="font-semibold text-[#0F766E] dark:text-[#2DD4BF]"
                          >
                            $
                          </span>
                          <span className="font-medium">{entry.command}</span>
                        </div>
                        <div className="space-y-0.5 pl-4 whitespace-pre-wrap break-words">
                          {renderLines(entry)}
                          {entry.id === activeTypingId && (
                            <span
                              aria-hidden="true"
                              className="terminal-caret inline-block h-3.5 w-1.5 align-middle bg-[#0F766E] dark:bg-[#2DD4BF]"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Interactive command prompt */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 border-t border-neutral-200 bg-[#FAFAFA] px-4 py-2.5 sm:px-5 dark:border-neutral-800 dark:bg-[#121212]"
              >
                <label htmlFor="playground-command-input" className="sr-only">
                  {t.inputAria}
                </label>
                <span
                  aria-hidden="true"
                  className="font-mono text-sm font-semibold text-[#0F766E] dark:text-[#2DD4BF]"
                >
                  $
                </span>
                <input
                  ref={inputRef}
                  id="playground-command-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.placeholder}
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent py-1 font-mono text-xs text-[#171717] placeholder:text-neutral-400 focus:outline-none sm:text-[13px] dark:text-[#F5F5F5] dark:placeholder:text-neutral-600"
                />
                <button
                  type="submit"
                  aria-label={t.runAria}
                  className="inline-flex h-8 items-center gap-1.5 rounded-[2px] border border-neutral-200 bg-white px-2.5 font-mono text-xs text-neutral-700 transition-colors hover:border-neutral-400 hover:text-[#171717] dark:border-neutral-800 dark:bg-[#1A1A1A] dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-[#F5F5F5]"
                >
                  <span>{t.runLabel}</span>
                  <CornerDownLeft className="h-3 w-3" aria-hidden="true" />
                </button>
              </form>

              {/* Mobile & desktop quick command buttons */}
              <div
                aria-label={t.quickCommandsAria}
                className="flex flex-wrap items-center gap-2 border-t border-neutral-200 bg-white px-4 py-3 sm:px-5 dark:border-neutral-800 dark:bg-[#151515]"
              >
                <span className="mr-1 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                  {t.commandsLabel}
                </span>
                {PRIMARY_TERMINAL_COMMANDS.map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => runCommand(cmd)}
                    className="inline-flex min-h-[34px] items-center rounded-[2px] border border-neutral-200 bg-[#FAFAFA] px-2.5 py-1 font-mono text-xs text-neutral-700 transition-colors hover:border-[#0F766E] hover:text-[#0F766E] dark:border-neutral-800 dark:bg-[#1B1B1B] dark:text-neutral-300 dark:hover:border-[#2DD4BF] dark:hover:text-[#2DD4BF]"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
