<script lang="ts">
  import { monthlySummaries, displayMonths } from '$lib/stores/networth';
  import { formatCurrency } from '$lib/utils/storage';
</script>

<div class="bg-white rounded-lg shadow-sm overflow-hidden">
  <!-- Summary Header -->
  <div class="bg-gray-800 text-white px-6 py-3">
    <h2 class="text-lg font-semibold">Net Worth Summary</h2>
  </div>
  
  <!-- Table Header -->
  <div class="bg-gray-50 px-6 py-2">
    <div class="grid grid-cols-7 gap-4">
      <div class="table-header">Summary</div>
      {#each $displayMonths as month}
        <div class="table-header text-center">
          {month.split('-')[1]}/{month.split('-')[0].slice(2)}
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Total Assets -->
  <div class="px-6 py-3 border-b border-gray-200">
    <div class="grid grid-cols-7 gap-4">
      <div class="font-semibold text-blue-600">Total Assets</div>
      {#each $monthlySummaries as summary}
        <div class="text-center font-semibold text-blue-600">
          {formatCurrency(summary.totalAssets)}
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Total Liabilities -->
  <div class="px-6 py-3 border-b border-gray-200">
    <div class="grid grid-cols-7 gap-4">
      <div class="font-semibold text-red-600">Total Liabilities</div>
      {#each $monthlySummaries as summary}
        <div class="text-center font-semibold text-red-600">
          {formatCurrency(summary.totalLiabilities)}
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Net Worth -->
  <div class="px-6 py-3 border-b border-gray-200 bg-green-50">
    <div class="grid grid-cols-7 gap-4">
      <div class="font-bold text-green-800 text-lg">Net Worth</div>
      {#each $monthlySummaries as summary}
        <div class="text-center font-bold text-green-800 text-lg">
          {formatCurrency(summary.netWorth)}
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Change -->
  <div class="px-6 py-3 border-b border-gray-200">
    <div class="grid grid-cols-7 gap-4">
      <div class="font-semibold text-gray-700">Change</div>
      {#each $monthlySummaries as summary, index}
        <div class="text-center font-semibold">
          {#if index === 0}
            <span class="text-gray-400">--</span>
          {:else}
            <span class={summary.change >= 0 ? 'positive-change' : 'negative-change'}>
              {formatCurrency(summary.change)}
            </span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Rate % -->
  <div class="px-6 py-3">
    <div class="grid grid-cols-7 gap-4">
      <div class="font-semibold text-gray-700">Rate %</div>
      {#each $monthlySummaries as summary, index}
        <div class="text-center font-semibold">
          {#if index === 0}
            <span class="text-gray-400">--</span>
          {:else}
            <span class={summary.changeRate >= 0 ? 'positive-change' : 'negative-change'}>
              {summary.changeRate.toFixed(2)}%
            </span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>