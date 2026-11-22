import { CONTACT_LINKS, PROFILE, TECH_STACK } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { getProjectCopy, TRANSLATIONS } from '../data/translations';
import type { Language } from './language';

export type TerminalCommandName =
  | 'help'
  | 'about'
  | 'projects'
  | 'stack'
  | 'contact'
  | 'clear';

export const PRIMARY_TERMINAL_COMMANDS: readonly Exclude<
  TerminalCommandName,
  'clear'
>[] = ['help', 'about', 'projects', 'stack', 'contact'];

export const ALL_TERMINAL_COMMANDS: readonly TerminalCommandName[] = [
  ...PRIMARY_TERMINAL_COMMANDS,
  'clear',
];

export interface TerminalOutputLine {
  text: string;
  tone?: 'default' | 'muted' | 'accent' | 'error';
  href?: string;
  external?: boolean;
}

export interface TerminalCommandResult {
  command: string;
  action: 'output' | 'clear';
  lines: TerminalOutputLine[];
}

export function normalizeTerminalInput(raw: string): string {
  return raw.trim().toLowerCase().replace(/^\$\s*/, '');
}

export function tabCompleteCommand(raw: string): string {
  const cleaned = normalizeTerminalInput(raw);
  if (!cleaned) return 'help';
  const match = ALL_TERMINAL_COMMANDS.find((cmd) => cmd.startsWith(cleaned));
  return match ?? raw;
}

export function executeTerminalCommand(
  rawInput: string,
  lang: Language = 'en',
): TerminalCommandResult {
  const command = normalizeTerminalInput(rawInput);
  const isId = lang === 'id';
  const t = TRANSLATIONS[lang];

  if (!command) {
    return {
      command: '',
      action: 'output',
      lines: [
        {
          text: isId
            ? 'Ketik "help" untuk melihat daftar perintah.'
            : 'Type "help" to list available commands.',
          tone: 'muted',
        },
      ],
    };
  }

  switch (command) {
    case 'clear':
      return {
        command,
        action: 'clear',
        lines: [],
      };

    case 'help':
      return {
        command,
        action: 'output',
        lines: isId
          ? [
              { text: 'Perintah yang tersedia:', tone: 'muted' },
              { text: '  about     — Kenali Rayy dan fokus karyanya.' },
              { text: '  projects  — Lihat daftar 8 proyek pilihan.' },
              { text: '  stack     — Lihat teknologi utama yang digunakan.' },
              { text: '  contact   — Temukan GitHub, Instagram, dan email.' },
              { text: '  clear     — Bersihkan riwayat terminal.' },
            ]
          : [
              { text: 'Available commands:', tone: 'muted' },
              { text: '  about     — Learn about Rayy and his focus.' },
              { text: '  projects  — List all 8 selected projects.' },
              { text: '  stack     — View core technologies.' },
              { text: '  contact   — Find GitHub, Instagram, and email.' },
              { text: '  clear     — Clear terminal history.' },
            ],
      };

    case 'about':
      return {
        command,
        action: 'output',
        lines: [
          {
            text: `${PROFILE.fullName} (${PROFILE.displayName} / ${PROFILE.username})`,
            tone: 'accent',
          },
          { text: `${PROFILE.role} · ${PROFILE.location}`, tone: 'muted' },
          { text: t.about.primary },
          {
            text: `${isId ? 'Fokus' : 'Positioning'}: "${t.hero.positioning}"`,
            tone: 'muted',
          },
        ],
      };

    case 'projects':
      return {
        command,
        action: 'output',
        lines: [
          {
            text: isId
              ? `Proyek Pilihan (${PROJECTS.length}):`
              : `Selected Projects (${PROJECTS.length}):`,
            tone: 'muted',
          },
          ...PROJECTS.map((project): TerminalOutputLine => {
            const copy = getProjectCopy(project, lang);
            return {
              text: `${project.number}. ${project.name.padEnd(18, ' ')} [${copy.category}] -> ${project.url ?? (isId ? 'Build privat (lihat bagian proyek)' : 'Private build (see section)')}`,
              href: project.url ?? '#projects',
              external: Boolean(project.url),
              tone: project.url ? 'default' : 'muted',
            };
          }),
        ],
      };

    case 'stack':
      return {
        command,
        action: 'output',
        lines: [
          {
            text: isId ? 'Teknologi Utama:' : 'Core Technology Stack:',
            tone: 'muted',
          },
          { text: TECH_STACK.join('  ·  '), tone: 'accent' },
          {
            text: isId
              ? 'Fokus: platform web fungsional, sistem bisnis, dan antarmuka yang bersih.'
              : 'Focus: functional web platforms, business systems, and clean interfaces.',
            tone: 'muted',
          },
        ],
      };

    case 'contact':
      return {
        command,
        action: 'output',
        lines: [
          { text: t.contact.heading, tone: 'accent' },
          ...CONTACT_LINKS.map((item): TerminalOutputLine => ({
            text: `${item.label.padEnd(10, ' ')} ${item.handle}`,
            href: item.href,
            external: item.external,
          })),
        ],
      };

    default:
      return {
        command,
        action: 'output',
        lines: [
          {
            text: isId
              ? `Perintah tidak ditemukan: "${command}".`
              : `Command not found: "${command}".`,
            tone: 'error',
          },
          {
            text: isId
              ? 'Coba salah satu: help, about, projects, stack, contact, clear.'
              : 'Try one of: help, about, projects, stack, contact, clear.',
            tone: 'muted',
          },
        ],
      };
  }
}
