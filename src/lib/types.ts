export interface Category {
  id: string;
  name: string;
  type: 'asset' | 'liability';
  order: number;
  color: string;
}

export interface Item {
  id: string;
  categoryId: string;
  name: string;
  order: number;
  monthlyValues: Record<string, number>; // key: "YYYY-MM", value: amount
}

export interface MonthlySummary {
  month: string;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  change: number;
  changeRate: number;
}

export interface NetWorthData {
  categories: Category[];
  items: Item[];
  currentMonth: string;
  displayMonths: string[];
}

export type CategoryType = 'asset' | 'liability';