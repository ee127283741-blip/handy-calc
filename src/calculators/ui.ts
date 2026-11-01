// Shared helpers for calculator islands.
export const $ = <T extends HTMLElement = HTMLInputElement>(root: ParentNode, sel: string) => root.querySelector(sel) as T;

export const fmt = (n: number, max = 2) => n.toLocaleString('en-US', { maximumFractionDigits: max });

/** Imperial for US/Liberia/Myanmar-style locales, metric elsewhere (UK/CA/AU). */
export const prefersImperial = () => /-(US|LR|MM)$/i.test(navigator.language || 'en-US');

export function wire(root: HTMLElement, compute: () => string) {
  const out = $<HTMLOutputElement>(root, 'output');
  const run = () => { out.textContent = compute(); };
  root.addEventListener('input', run);
  root.addEventListener('change', run);
  $<HTMLButtonElement>(root, '[data-copy]').addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    try { await navigator.clipboard.writeText(out.textContent || ''); btn.textContent = 'Copied'; }
    catch { btn.textContent = 'Copy failed'; }
    setTimeout(() => (btn.textContent = 'Copy result'), 1500);
  });
  $<HTMLButtonElement>(root, '[data-reset]').addEventListener('click', () => {
    (root.querySelector('form') as HTMLFormElement).reset();
    root.dispatchEvent(new CustomEvent('calc-reset'));
    run();
  });
  return run;
}

/** Today's local date as YYYY-MM-DD. */
export const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const usd = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: n < 1 ? 4 : 2 })}`;
