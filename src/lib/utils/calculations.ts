import type { Category, Item, MonthlySummary } from '../types';

export function calculateCategoryTotal(
  categoryId: string,
  month: string,
  items: Item[]
): number {
  return items
    .filter(item => item.categoryId === categoryId)
    .reduce((total, item) => total + (item.monthlyValues[month] || 0), 0);
}

export function calculateTotalAssets(
  month: string,
  categories: Category[],
  items: Item[]
): number {
  return categories
    .filter(cat => cat.type === 'asset')
    .reduce((total, cat) => total + calculateCategoryTotal(cat.id, month, items), 0);
}

export function calculateTotalLiabilities(
  month: string,
  categories: Category[],
  items: Item[]
): number {
  return categories
    .filter(cat => cat.type === 'liability')
    .reduce((total, cat) => total + calculateCategoryTotal(cat.id, month, items), 0);
}

export function calculateNetWorth(
  month: string,
  categories: Category[],
  items: Item[]
): number {
  const totalAssets = calculateTotalAssets(month, categories, items);
  const totalLiabilities = calculateTotalLiabilities(month, categories, items);
  return totalAssets - totalLiabilities;
}

export function calculateMonthlyChange(
  currentMonth: string,
  previousMonth: string,
  categories: Category[],
  items: Item[]
): number {
  const currentNetWorth = calculateNetWorth(currentMonth, categories, items);
  const previousNetWorth = calculateNetWorth(previousMonth, categories, items);
  return currentNetWorth - previousNetWorth;
}

export function calculateChangeRate(
  currentMonth: string,
  previousMonth: string,
  categories: Category[],
  items: Item[]
): number {
  const currentNetWorth = calculateNetWorth(currentMonth, categories, items);
  const previousNetWorth = calculateNetWorth(previousMonth, categories, items);
  
  if (previousNetWorth === 0) return 0;
  
  return ((currentNetWorth - previousNetWorth) / Math.abs(previousNetWorth)) * 100;
}

export function calculateMonthlySummaries(
  months: string[],
  categories: Category[],
  items: Item[]
): MonthlySummary[] {
  return months.map((month, index) => {
    const totalAssets = calculateTotalAssets(month, categories, items);
    const totalLiabilities = calculateTotalLiabilities(month, categories, items);
    const netWorth = calculateNetWorth(month, categories, items);
    
    let change = 0;
    let changeRate = 0;
    
    if (index > 0) {
      const previousMonth = months[index - 1];
      change = calculateMonthlyChange(month, previousMonth, categories, items);
      changeRate = calculateChangeRate(month, previousMonth, categories, items);
    }
    
    return {
      month,
      totalAssets,
      totalLiabilities,
      netWorth,
      change,
      changeRate,
    };
  });
}

export function getPreviousMonth(month: string): string {
  const [year, monthNum] = month.split('-').map(Number);
  const date = new Date(year, monthNum - 2, 1); // -2 because monthNum is 1-based and we want previous month
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function getNextMonth(month: string): string {
  const [year, monthNum] = month.split('-').map(Number);
  const date = new Date(year, monthNum, 1); // monthNum is 1-based, so this gets next month
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}