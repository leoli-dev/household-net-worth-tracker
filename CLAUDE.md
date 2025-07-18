# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands

- `npm install --legacy-peer-deps` - Install dependencies (use legacy peer deps flag)
- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Run TypeScript and Svelte checks
- `npm run check:watch` - Run checks in watch mode

### Type Checking

Always run `npm run check` before committing changes to ensure TypeScript and Svelte component types are correct.

## Project Architecture

### Technology Stack

- **Framework**: SvelteKit with TypeScript
- **Styling**: TailwindCSS v3 with @tailwindcss/forms
- **Build Tool**: Vite
- **State Management**: Svelte stores with reactive patterns
- **Data Persistence**: Browser localStorage (client-side only)
- **Deployment**: Vercel (adapter-auto)

### Core Architecture Patterns

#### Data Flow

The application follows a centralized state management pattern:

1. **NetWorthData Store** (`src/lib/stores/networth.ts`) - Central data store with auto-persistence
2. **Derived Stores** - Computed values that react to main store changes
3. **Actions Object** - All state mutations happen through well-defined actions
4. **Automatic Persistence** - Data automatically saves to localStorage on every change

#### Key Data Structures

- **Categories**: Asset/Liability groupings with type, order, and color
- **Items**: Individual tracking entries belonging to categories
- **Monthly Values**: Record<string, number> mapping "YYYY-MM" to amounts
- **Display Months**: 6-month sliding window for the spreadsheet view

#### Component Architecture

- **Page Components**: Routes that orchestrate the overall layout
- **Section Components**: CategorySection handles category display and item management
- **Row Components**: ItemRow handles individual item editing and monthly value input
- **Navigation**: MonthNavigation handles time period selection
- **Summary**: SummarySection computes and displays totals, net worth, and changes

### State Management Patterns

- Use `netWorthData.update()` for all state changes
- Leverage derived stores for computed values (totals, filtered data)
- Actions are organized by domain (category actions, item actions, navigation)
- All reactive calculations happen automatically through Svelte's reactivity

### Storage and Data Persistence

- Data auto-saves to localStorage on every store change
- `loadData()` handles initial data loading with fallback to defaults
- `getDefaultData()` provides sample data structure - modify this for default categories/items
- Export/import functionality available through actions

### TypeScript Integration

- Strict TypeScript configuration with full type checking
- Comprehensive type definitions in `src/lib/types.ts`
- Use `npm run check` to validate types across Svelte components
- Component props are fully typed through Svelte's TypeScript support

## Important Implementation Details

### Adding New Categories

Modify `getDefaultData()` in `src/lib/utils/storage.ts` to add new default categories. Each category needs:

- Unique ID
- Name and type ('asset' or 'liability')
- Order for display sorting
- Color class for theming

### Monthly Value Handling

- Monthly values use "YYYY-MM" string format as keys
- Values are stored as numbers (no currency formatting in data)
- Display formatting happens in components using `formatCurrency()`
- Missing months default to 0 in calculations

### Local Development Notes

- App works entirely client-side (no server required)
- Data persists between browser sessions via localStorage
- Use browser dev tools to inspect/backup localStorage data
- Responsive design works on mobile, tablet, and desktop

## File Organization

### Core Application Files

- `src/routes/+page.svelte` - Main application page
- `src/routes/+layout.svelte` - Application layout and global styles
- `src/lib/stores/networth.ts` - Central state management
- `src/lib/types.ts` - TypeScript type definitions
- `src/lib/utils/storage.ts` - Data persistence and default data
- `src/lib/utils/calculations.ts` - Financial calculations and utilities

### Component Structure

Components are organized by functionality in `src/lib/components/`:

- CategorySection.svelte - Manages category display and item operations
- ItemRow.svelte - Handles individual item editing and monthly values
- MonthNavigation.svelte - Time period navigation controls
- SummarySection.svelte - Net worth calculations and summary display