<script lang="ts">
  import { netWorthData, monthlySummaries, assetCategories, liabilityCategories } from '$lib/stores/networth';
  import CategorySection from '$lib/components/CategorySection.svelte';
  import SummarySection from '$lib/components/SummarySection.svelte';
  import MonthNavigation from '$lib/components/MonthNavigation.svelte';
</script>

<svelte:head>
  <title>Household Net Worth Tracker</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 text-center mb-4">
        2025 Household Net Worth Tracker
      </h1>
      <MonthNavigation />
    </header>

    <!-- Main Content -->
    <div class="space-y-6">
      <!-- Assets Section -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="bg-teal-500 text-white px-6 py-3">
          <h2 class="text-lg font-semibold">Assets</h2>
        </div>
        
        {#each $assetCategories as category}
          <CategorySection {category} />
        {/each}
      </div>

      <!-- Liabilities Section -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="bg-teal-500 text-white px-6 py-3">
          <h2 class="text-lg font-semibold">Liabilities</h2>
        </div>
        
        {#each $liabilityCategories as category}
          <CategorySection {category} />
        {/each}
      </div>

      <!-- Summary Section -->
      <SummarySection />
    </div>
  </div>
</div>
