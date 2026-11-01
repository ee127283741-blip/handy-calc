export const WEEKS_PER_MONTH = 52 / 12;

export interface RoiInput {
  employees: number;
  hoursSavedPerWeek: number;
  hourlyCost: number;
  adoptionPct: number;
  seatCostPerMonth: number;
  setupCost: number;
}

/** Seats are paid for every employee; only the adopting share saves time (conservative). */
export function roi(i: RoiInput) {
  const activeUsers = i.employees * (i.adoptionPct / 100);
  const hoursSaved = activeUsers * i.hoursSavedPerWeek * WEEKS_PER_MONTH;
  const value = hoursSaved * i.hourlyCost;
  const toolCost = i.employees * i.seatCostPerMonth;
  const net = value - toolCost;
  const firstYearCost = toolCost * 12 + i.setupCost;
  const roiPct = firstYearCost > 0 ? ((value * 12 - firstYearCost) / firstYearCost) * 100 : Infinity;
  const paybackMonths = net > 0 ? i.setupCost / net : Infinity;
  return { activeUsers, hoursSaved, value, toolCost, net, firstYearCost, roiPct, paybackMonths };
}
