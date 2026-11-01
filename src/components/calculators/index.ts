import CupsToGrams from './CupsToGrams.astro';
import OvenTemperature from './OvenTemperature.astro';
import Paint from './Paint.astro';
import Yarn from './Yarn.astro';
import DaysBetween from './DaysBetween.astro';

// Map frontmatter `calculator:` names to widget components.
export const WIDGETS: Record<string, any> = { CupsToGrams, OvenTemperature, Paint, Yarn, DaysBetween };
