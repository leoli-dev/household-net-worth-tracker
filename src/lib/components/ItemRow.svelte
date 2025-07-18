<script lang="ts">
  import type { Item } from '$lib/types';
  import { displayMonths, actions } from '$lib/stores/networth';
  import { formatCurrency } from '$lib/utils/storage';
  
  export let item: Item;
  
  function updateValue(month: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value.replace(/[,$]/g, '')) || 0;
    actions.updateItemValue(item.id, month, value);
  }
  
  function deleteItem() {
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      actions.deleteItem(item.id);
    }
  }
  
  function formatInputValue(value: number): string {
    return value ? value.toLocaleString() : '';
  }
</script>

<div class="px-6 py-2 hover:bg-gray-50">
  <div class="grid grid-cols-7 gap-4 items-center">
    <div class="flex items-center space-x-2">
      <span class="text-sm text-gray-900">{item.name}</span>
      <button
        on:click={deleteItem}
        class="text-red-500 hover:text-red-700 text-xs"
        title="Delete item"
      >
        ×
      </button>
    </div>
    
    {#each $displayMonths as month}
      <div class="text-center">
        <input
          type="text"
          value={formatInputValue(item.monthlyValues[month] || 0)}
          on:input={(e) => updateValue(month, e)}
          class="input-field currency-input"
          placeholder="0"
        />
      </div>
    {/each}
  </div>
</div>