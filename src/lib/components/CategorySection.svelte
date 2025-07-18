<script lang="ts">
  import type { Category } from '$lib/types';
  import { itemsByCategory, displayMonths, actions } from '$lib/stores/networth';
  import { calculateCategoryTotal } from '$lib/utils/calculations';
  import { formatCurrency } from '$lib/utils/storage';
  import { items } from '$lib/stores/networth';
  import ItemRow from './ItemRow.svelte';
  
  export let category: Category;
  
  $: categoryItems = $itemsByCategory[category.id] || [];
  
  function addItem() {
    const name = prompt('Enter item name:');
    if (name) {
      actions.addItem(category.id, name);
    }
  }
</script>

<div class="border-b border-gray-200 last:border-b-0">
  <!-- Category Header -->
  <div class="bg-teal-100 px-6 py-3 flex justify-between items-center">
    <h3 class="font-semibold text-teal-800">{category.name}</h3>
    <button
      on:click={addItem}
      class="text-teal-600 hover:text-teal-800 text-sm font-medium"
    >
      + Add Item
    </button>
  </div>
  
  <!-- Table Header -->
  <div class="bg-gray-50 px-6 py-2">
    <div class="grid grid-cols-7 gap-4">
      <div class="table-header">Month:</div>
      {#each $displayMonths as month}
        <div class="table-header text-center">
          {month.split('-')[1]}/{month.split('-')[0].slice(2)}
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Items -->
  {#each categoryItems as item}
    <ItemRow {item} />
  {/each}
  
  <!-- Category Total -->
  <div class="bg-gray-100 px-6 py-3">
    <div class="grid grid-cols-7 gap-4">
      <div class="font-semibold text-gray-900">Total {category.name}</div>
      {#each $displayMonths as month}
        <div class="text-center font-semibold text-gray-900">
          {formatCurrency(calculateCategoryTotal(category.id, month, $items))}
        </div>
      {/each}
    </div>
  </div>
</div>