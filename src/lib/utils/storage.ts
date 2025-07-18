import type { NetWorthData, Category, Item } from '../types';

const STORAGE_KEY = 'household-net-worth-data';

export function loadData(): NetWorthData {
  if (typeof window === 'undefined') {
    return getDefaultData();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load data from localStorage:', error);
  }

  return getDefaultData();
}

export function saveData(data: NetWorthData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data to localStorage:', error);
  }
}

export function getDefaultData(): NetWorthData {
  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  
  // Generate 6 months starting from current month
  const displayMonths = generateMonthRange(currentMonth, 6);

  const categories: Category[] = [
    { id: 'bank-account', name: 'Bank Account', type: 'asset', order: 1, color: 'bg-teal-500' },
    { id: 'financial-asset', name: 'Financial Asset', type: 'asset', order: 2, color: 'bg-teal-500' },
    { id: 'real-estate', name: 'Real Estate', type: 'asset', order: 3, color: 'bg-teal-500' },
    { id: 'liabilities', name: 'Liabilities', type: 'liability', order: 4, color: 'bg-teal-500' },
  ];

  const items: Item[] = [
    // Bank Account items
    { 
      id: 'checking', 
      categoryId: 'bank-account', 
      name: 'Checking', 
      order: 1, 
      monthlyValues: {
        '2025-01': 1500,
        '2025-02': 32191,
        '2025-03': 0,
        '2025-04': 0,
        '2025-05': 0,
        '2025-06': 7100
      }
    },
    { 
      id: 'saving', 
      categoryId: 'bank-account', 
      name: 'Saving', 
      order: 2, 
      monthlyValues: {
        '2025-01': 13000,
        '2025-02': 0,
        '2025-03': 500,
        '2025-04': 0,
        '2025-05': 0,
        '2025-06': 0
      }
    },
    
    // Financial Asset items
    { 
      id: 'rrsp-dcpp', 
      categoryId: 'financial-asset', 
      name: 'RRSP & DCPP', 
      order: 1, 
      monthlyValues: {
        '2025-01': 371896,
        '2025-02': 383505,
        '2025-03': 379419,
        '2025-04': 369744,
        '2025-05': 400387,
        '2025-06': 420719
      }
    },
    { 
      id: 'tfsa', 
      categoryId: 'financial-asset', 
      name: 'TFSA', 
      order: 2, 
      monthlyValues: {
        '2025-01': 0,
        '2025-02': 0,
        '2025-03': 0,
        '2025-04': 0,
        '2025-05': 0,
        '2025-06': 0
      }
    },
    { 
      id: 'resp', 
      categoryId: 'financial-asset', 
      name: 'RESP', 
      order: 3, 
      monthlyValues: {
        '2025-01': 31658,
        '2025-02': 31094,
        '2025-03': 29070,
        '2025-04': 27750,
        '2025-05': 29337,
        '2025-06': 30626
      }
    },
    { 
      id: 'addy-investment', 
      categoryId: 'financial-asset', 
      name: 'Addy Investment', 
      order: 4, 
      monthlyValues: {
        '2025-01': 2000,
        '2025-02': 2000,
        '2025-03': 2000,
        '2025-04': 2000,
        '2025-05': 2000,
        '2025-06': 2000
      }
    },
    { 
      id: 'company-stock', 
      categoryId: 'financial-asset', 
      name: 'Company Stock', 
      order: 5, 
      monthlyValues: {
        '2025-01': 20012,
        '2025-02': 24500,
        '2025-03': 32578,
        '2025-04': 32620,
        '2025-05': 35500,
        '2025-06': 34116
      }
    },
    
    // Real Estate items
    { 
      id: 'primary', 
      categoryId: 'real-estate', 
      name: 'Primary', 
      order: 1, 
      monthlyValues: {
        '2025-01': 1250000,
        '2025-02': 1250000,
        '2025-03': 1250000,
        '2025-04': 1250000,
        '2025-05': 1250000,
        '2025-06': 1250000
      }
    },
    { 
      id: 'townhouse-1', 
      categoryId: 'real-estate', 
      name: 'Townhouse 1', 
      order: 2, 
      monthlyValues: {
        '2025-01': 700000,
        '2025-02': 700000,
        '2025-03': 700000,
        '2025-04': 700000,
        '2025-05': 700000,
        '2025-06': 700000
      }
    },
    { 
      id: 'townhouse-2', 
      categoryId: 'real-estate', 
      name: 'Townhouse 2', 
      order: 3, 
      monthlyValues: {
        '2025-01': 760000,
        '2025-02': 760000,
        '2025-03': 760000,
        '2025-04': 760000,
        '2025-05': 760000,
        '2025-06': 760000
      }
    },
    { 
      id: 'townhouse-3', 
      categoryId: 'real-estate', 
      name: 'Townhouse 3', 
      order: 4, 
      monthlyValues: {
        '2025-01': 700000,
        '2025-02': 700000,
        '2025-03': 700000,
        '2025-04': 700000,
        '2025-05': 700000,
        '2025-06': 700000
      }
    },
    { 
      id: 'condo', 
      categoryId: 'real-estate', 
      name: 'Condo', 
      order: 5, 
      monthlyValues: {
        '2025-01': 420000,
        '2025-02': 420000,
        '2025-03': 420000,
        '2025-04': 420000,
        '2025-05': 420000,
        '2025-06': 420000
      }
    },
    
    // Liability items
    { 
      id: 'mortgage', 
      categoryId: 'liabilities', 
      name: 'Mortgage', 
      order: 1, 
      monthlyValues: {
        '2025-01': 2518447,
        '2025-02': 2515511,
        '2025-03': 2510758,
        '2025-04': 2509300,
        '2025-05': 2506085,
        '2025-06': 2502983
      }
    },
    { 
      id: 'credit-card', 
      categoryId: 'liabilities', 
      name: 'Credit Card', 
      order: 2, 
      monthlyValues: {
        '2025-01': 2400,
        '2025-02': 32600,
        '2025-03': 9000,
        '2025-04': 19900,
        '2025-05': 19620,
        '2025-06': 17034
      }
    },
    { 
      id: 'car-loan', 
      categoryId: 'liabilities', 
      name: 'Car Loan', 
      order: 3, 
      monthlyValues: {
        '2025-01': 2384,
        '2025-02': 50100,
        '2025-03': 0,
        '2025-04': 0,
        '2025-05': 0,
        '2025-06': 0
      }
    },
    { 
      id: 'heloc', 
      categoryId: 'liabilities', 
      name: 'HELOC', 
      order: 4, 
      monthlyValues: {
        '2025-01': 0,
        '2025-02': 0,
        '2025-03': 22800,
        '2025-04': 4136,
        '2025-05': 0,
        '2025-06': 0
      }
    },
  ];

  return {
    categories,
    items,
    currentMonth,
    displayMonths,
  };
}

function generateMonthRange(startMonth: string, count: number): string[] {
  const [year, month] = startMonth.split('-').map(Number);
  const months = [];
  
  for (let i = 0; i < count; i++) {
    const date = new Date(year, month - 1 + i, 1);
    const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    months.push(monthStr);
  }
  
  return months;
}

export function formatMonth(monthStr: string): string {
  const [year, month] = monthStr.split('-').map(Number);
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function exportData(data: NetWorthData): string {
  return JSON.stringify(data, null, 2);
}

export function importData(jsonStr: string): NetWorthData {
  try {
    const data = JSON.parse(jsonStr);
    // Basic validation
    if (!data.categories || !data.items || !Array.isArray(data.categories) || !Array.isArray(data.items)) {
      throw new Error('Invalid data format');
    }
    return data;
  } catch (error) {
    console.error('Failed to import data:', error);
    throw new Error('Invalid JSON format');
  }
}