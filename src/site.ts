export const SITE_NAME = 'Handy Calc';
export const SITE_TAGLINE = 'Free, sourced calculators for the kitchen, home, crafts and calendar.';

export interface Category {
  slug: string;
  name: string;
  title: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { slug: 'cooking', name: 'Cooking & Baking', title: 'Cooking & Baking Conversion Calculators', description: 'Convert cups to grams by ingredient, oven temperatures and Gas Marks, with sourced reference data.' },
  { slug: 'home-diy', name: 'Home & DIY', title: 'Home & DIY Calculators', description: 'Estimate materials for home projects such as paint, with clear formulas and adjustable assumptions.' },
  { slug: 'crafts', name: 'Crafts', title: 'Crochet, Knitting & Sewing Calculators', description: 'Estimate yarn for blankets and other projects using Craft Yarn Council weight categories.' },
  { slug: 'date-time', name: 'Date & Time', title: 'Date & Time Calculators', description: 'Count calendar days and business days between two dates.' },
  { slug: 'units', name: 'Unit Conversion', title: 'Unit Conversion Calculators', description: 'Everyday length and weight conversions such as inches to centimeters and pounds to kilograms.' },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug)!;
