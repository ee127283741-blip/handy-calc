// Dates are handled as UTC calendar days so daylight-saving changes never shift results.
const DAY_MS = 86_400_000;

/** Parse "YYYY-MM-DD" to a UTC day number. Returns NaN if invalid. */
export function toDayNumber(iso: string): number {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return NaN;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const t = Date.UTC(y, mo - 1, d);
  const back = new Date(t);
  if (back.getUTCFullYear() !== y || back.getUTCMonth() !== mo - 1 || back.getUTCDate() !== d) return NaN;
  return t / DAY_MS;
}

/** Signed number of days from start to end; add 1 when includeEnd counts both ends. */
export function daysBetween(start: string, end: string, includeEnd = false): number {
  const diff = toDayNumber(end) - toDayNumber(start);
  if (Number.isNaN(diff)) throw new RangeError('Invalid date');
  return includeEnd ? diff + Math.sign(diff || 1) : diff;
}

/** Monday–Friday days in [start, end) (end exclusive, or inclusive if includeEnd). No holidays. */
export function businessDaysBetween(start: string, end: string, includeEnd = false): number {
  let a = toDayNumber(start);
  let b = toDayNumber(end);
  if (Number.isNaN(a) || Number.isNaN(b)) throw new RangeError('Invalid date');
  let sign = 1;
  if (b < a) [a, b, sign] = [b, a, -1];
  if (includeEnd) b += 1;
  let count = 0;
  for (let d = a; d < b; d++) {
    const dow = new Date(d * DAY_MS).getUTCDay();
    if (dow !== 0 && dow !== 6) count++;
  }
  return count * sign;
}

export function breakdown(days: number) {
  const abs = Math.abs(days);
  return { weeks: Math.floor(abs / 7), days: abs % 7 };
}
