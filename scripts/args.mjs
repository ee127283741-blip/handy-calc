// Tiny --key value argument parser shared by the scaffold scripts.
export function parseArgs(argv = process.argv.slice(2)) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) out[argv[i].slice(2)] = argv[i + 1]?.startsWith('--') ? true : argv[++i];
  }
  return out;
}
export const today = () => new Date().toISOString().slice(0, 10);
export const pascal = (slug) => slug.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
export const camel = (slug) => pascal(slug).replace(/^./, (c) => c.toLowerCase());
