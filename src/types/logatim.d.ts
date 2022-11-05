declare module 'logatim' {
  const getLevel: () => void;
  const setLevel: (level: number) => void;
  const info: (msg: unknown[]) => void;
  const trace: (msg: unknown[]) => void;
  const debug: (msg: unknown[]) => void;
  const warn: (msg: unknown[]) => void;
  const error: (msg: unknown[]) => void;
}
