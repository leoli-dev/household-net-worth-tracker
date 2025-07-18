# 🏠 Household Net Worth Tracker

A modern, responsive web application for tracking your household's net worth over time. Built with SvelteKit and TailwindCSS, this app provides an intuitive interface for managing your assets, liabilities, and monitoring your financial progress month by month.

## ✨ Features

- 📊 **Excel-like Interface** - Familiar spreadsheet layout with monthly columns
- 🏦 **Asset Management** - Track bank accounts, investments, real estate, and more
- 💳 **Liability Tracking** - Monitor mortgages, credit cards, loans, and other debts
- 🧮 **Automatic Calculations** - Real-time computation of totals, net worth, changes, and rates
- 📱 **Responsive Design** - Beautiful UI that works on desktop, tablet, and mobile
- 💾 **Local Storage** - Data persists in your browser (no server required)
- 🎯 **Add/Edit/Delete** - Full CRUD operations for categories and items
- 📈 **Monthly Navigation** - Navigate between different time periods
- 🎨 **Modern UI** - Clean, professional design with TailwindCSS

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd household-net-worth-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with:

```bash
npm run preview
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Connect your GitHub repository
   - Vercel will automatically detect SvelteKit and configure the build settings

### Deploy to Netlify

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy the `build` directory**
   - Connect your repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`

### Deploy to Other Platforms

The application is built with SvelteKit and can be deployed to any static hosting service. The build output is in the `build` directory after running `npm run build`.

## 📖 How to Use

### 1. **Adding Categories**
- Click the "+ Add Item" button in any category section
- Enter the name for your new tracking item
- The item will appear in the category with editable monthly columns

### 2. **Entering Data**
- Click on any cell in the monthly columns to edit values
- Enter amounts without currency symbols (e.g., "1500" for $1,500)
- Press Enter or click outside the cell to save

### 3. **Navigation**
- Use the "Previous" and "Next" buttons to navigate between months
- The app shows 6 months at a time starting from your selected month

### 4. **Viewing Calculations**
- Category totals are automatically calculated and displayed
- The summary section shows:
  - Total Assets
  - Total Liabilities  
  - Net Worth
  - Monthly Change (amount and percentage)

### 5. **Managing Items**
- Click the "×" button next to any item name to delete it
- Items can be reordered by modifying their order in the data

### 6. **Data Persistence**
- All data is automatically saved to your browser's local storage
- Your data will persist between browser sessions
- To backup data, you can export it using the browser's developer tools

## 🏗️ Project Structure

```
src/
├── lib/
│   ├── components/          # Svelte components
│   │   ├── CategorySection.svelte
│   │   ├── ItemRow.svelte
│   │   ├── MonthNavigation.svelte
│   │   └── SummarySection.svelte
│   ├── stores/              # Svelte stores for state management
│   │   └── networth.ts
│   ├── utils/               # Utility functions
│   │   ├── calculations.ts
│   │   └── storage.ts
│   └── types.ts            # TypeScript type definitions
├── routes/
│   ├── +layout.svelte      # App layout
│   └── +page.svelte        # Main page
└── app.css                 # Global styles
```

## 🛠️ Technology Stack

- **Framework:** SvelteKit
- **Language:** TypeScript
- **Styling:** TailwindCSS v3
- **Build Tool:** Vite
- **State Management:** Svelte Stores
- **Data Storage:** localStorage
- **Deployment:** Vercel (adapter-auto)

## 🎨 Customization

### Adding New Categories
To add new default categories, modify the `getDefaultData()` function in `src/lib/utils/storage.ts`:

```typescript
const categories: Category[] = [
  { id: 'new-category', name: 'New Category', type: 'asset', order: 5, color: 'bg-teal-500' },
  // ... other categories
];
```

### Styling
The app uses TailwindCSS for styling. You can customize colors, fonts, and layout in:
- `tailwind.config.js` - Theme configuration
- `src/app.css` - Global styles and custom components

### Data Structure
The app uses a hierarchical data structure:
- **Categories** contain multiple **Items**
- **Items** have **Monthly Values** for each tracking period
- All calculations are reactive and update automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by traditional spreadsheet-based net worth tracking
- Built with modern web technologies for better user experience
- Designed for privacy with local-only data storage
