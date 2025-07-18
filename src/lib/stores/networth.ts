import { writable, derived, get } from 'svelte/store';
import type { NetWorthData, Category, Item, MonthlySummary } from '../types';
import { loadData, saveData } from '../utils/storage';
import { calculateMonthlySummaries, generateId } from '../utils/calculations';

// Main data store
export const netWorthData = writable<NetWorthData>(loadData());

// Save data to localStorage whenever it changes
netWorthData.subscribe(data => {
  saveData(data);
});

// Derived stores
export const categories = derived(netWorthData, $data => $data.categories);
export const items = derived(netWorthData, $data => $data.items);
export const currentMonth = derived(netWorthData, $data => $data.currentMonth);
export const displayMonths = derived(netWorthData, $data => $data.displayMonths);

// Monthly summaries
export const monthlySummaries = derived(
  [netWorthData],
  ([$data]) => calculateMonthlySummaries($data.displayMonths, $data.categories, $data.items)
);

// Asset and liability categories
export const assetCategories = derived(
  categories,
  $categories => $categories.filter(cat => cat.type === 'asset')
);

export const liabilityCategories = derived(
  categories,
  $categories => $categories.filter(cat => cat.type === 'liability')
);

// Items by category
export const itemsByCategory = derived(
  items,
  $items => {
    const grouped: Record<string, Item[]> = {};
    $items.forEach(item => {
      if (!grouped[item.categoryId]) {
        grouped[item.categoryId] = [];
      }
      grouped[item.categoryId].push(item);
    });
    
    // Sort items by order within each category
    Object.keys(grouped).forEach(categoryId => {
      grouped[categoryId].sort((a, b) => a.order - b.order);
    });
    
    return grouped;
  }
);

// Actions
export const actions = {
  // Category actions
  addCategory(name: string, type: 'asset' | 'liability'): void {
    netWorthData.update(data => {
      const existingCategories = data.categories.filter(cat => cat.type === type);
      const maxOrder = existingCategories.reduce((max, cat) => Math.max(max, cat.order), 0);
      
      const newCategory: Category = {
        id: generateId(),
        name,
        type,
        order: maxOrder + 1,
        color: 'bg-teal-500'
      };
      
      return {
        ...data,
        categories: [...data.categories, newCategory]
      };
    });
  },

  updateCategory(categoryId: string, updates: Partial<Category>): void {
    netWorthData.update(data => ({
      ...data,
      categories: data.categories.map(cat => 
        cat.id === categoryId ? { ...cat, ...updates } : cat
      )
    }));
  },

  deleteCategory(categoryId: string): void {
    netWorthData.update(data => ({
      ...data,
      categories: data.categories.filter(cat => cat.id !== categoryId),
      items: data.items.filter(item => item.categoryId !== categoryId)
    }));
  },

  // Item actions
  addItem(categoryId: string, name: string): void {
    netWorthData.update(data => {
      const existingItems = data.items.filter(item => item.categoryId === categoryId);
      const maxOrder = existingItems.reduce((max, item) => Math.max(max, item.order), 0);
      
      const newItem: Item = {
        id: generateId(),
        categoryId,
        name,
        order: maxOrder + 1,
        monthlyValues: {}
      };
      
      return {
        ...data,
        items: [...data.items, newItem]
      };
    });
  },

  updateItem(itemId: string, updates: Partial<Item>): void {
    netWorthData.update(data => ({
      ...data,
      items: data.items.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    }));
  },

  updateItemValue(itemId: string, month: string, value: number): void {
    netWorthData.update(data => ({
      ...data,
      items: data.items.map(item => 
        item.id === itemId 
          ? { ...item, monthlyValues: { ...item.monthlyValues, [month]: value } }
          : item
      )
    }));
  },

  deleteItem(itemId: string): void {
    netWorthData.update(data => ({
      ...data,
      items: data.items.filter(item => item.id !== itemId)
    }));
  },

  // Month navigation
  navigateToMonth(month: string): void {
    netWorthData.update(data => {
      const [year, monthNum] = month.split('-').map(Number);
      const displayMonths = [];
      
      for (let i = 0; i < 6; i++) {
        const date = new Date(year, monthNum - 1 + i, 1);
        const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        displayMonths.push(monthStr);
      }
      
      return {
        ...data,
        currentMonth: month,
        displayMonths
      };
    });
  },

  // Data management
  exportData(): string {
    return JSON.stringify(get(netWorthData), null, 2);
  },

  importData(jsonStr: string): void {
    try {
      const data = JSON.parse(jsonStr);
      netWorthData.set(data);
    } catch (error) {
      console.error('Failed to import data:', error);
      throw new Error('Invalid JSON format');
    }
  },

  resetData(): void {
    netWorthData.set(loadData());
  }
};