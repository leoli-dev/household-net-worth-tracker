<script lang="ts">
  import { currentMonth, displayMonths, actions } from '$lib/stores/networth';
  import { getPreviousMonth, getNextMonth } from '$lib/utils/calculations';
  
  function navigatePrevious() {
    const prevMonth = getPreviousMonth($currentMonth);
    actions.navigateToMonth(prevMonth);
  }
  
  function navigateNext() {
    const nextMonth = getNextMonth($currentMonth);
    actions.navigateToMonth(nextMonth);
  }
  
  function formatMonthDisplay(month: string): string {
    const [year, monthNum] = month.split('-').map(Number);
    const date = new Date(year, monthNum - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
</script>

<div class="flex items-center justify-center space-x-4 mb-6">
  <button
    on:click={navigatePrevious}
    class="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
  >
    ← Previous
  </button>
  
  <div class="text-center">
    <h2 class="text-lg font-semibold text-gray-700">
      Starting: {formatMonthDisplay($currentMonth)}
    </h2>
    <p class="text-sm text-gray-500">
      Showing {$displayMonths.length} months
    </p>
  </div>
  
  <button
    on:click={navigateNext}
    class="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
  >
    Next →
  </button>
</div>