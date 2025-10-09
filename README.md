# Task & Expense Manager CLI

## Overview
Task & Expense Manager CLI is a Node.js command-line application for tracking personal tasks and day-to-day expenses from the terminal. It is intentionally file-backed so you can clone the repo, run it locally, and inspect the saved data without setting up a database or remote services.

## Table of Contents
- [Overview](#overview)
- [Feature Highlights](#feature-highlights)
  - [Task Management](#task-management)
  - [Expense Management](#expense-management)
- [How It Works](#how-it-works)
- [Quick Start](#quick-start)
- [CLI Navigation](#cli-navigation)
- [Mock API Layer](#mock-api-layer)
- [Project Structure](#project-structure)
- [Data Storage](#data-storage)
- [Development Notes](#development-notes)
- [Roadmap Ideas](#roadmap-ideas)

## Feature Highlights

### Task Management
- Add tasks with auto-incrementing IDs, due dates, status, and category metadata
- Review every task with human-readable summaries, including overdue markers
- Update, remove, search, and filter tasks directly from the CLI
- Generate quick reports: status counts, grouped listings, and overdue views
- Mark tasks complete while preserving historical data in `data/tasks.json`

### Expense Management
- Capture expenses with title, amount, category, and date stamps
- Browse the current ledger, edit entries, or remove outdated expenses
- Filter expenses by category or by date range to review specific periods
- View aggregate totals and breakdowns per category for quick budgeting insights
- Reuse the same ID generator pattern to keep expense IDs unique and ordered

## How It Works
- `main.js` provides the interactive menus for tasks and expenses.
- CLI flows in `cli/` prompt for input using Node's `readline` and delegate logic to helper modules.
- Domain models in `models/` normalize data (parsing dates, formatting output) before persistence.
- The `api/` folder hosts mock API modules that read/write JSON files to simulate server calls.
- Local JSON files in `data/` act as the persistent store, making it easy to inspect or reset state.

## Quick Start

### Prerequisites
- Node.js 18 or newer (ES modules are used throughout)

### Installation
```bash
# Clone the repository
# Replace <folder> with the destination you prefer
git clone <repo-url> <folder>
cd <folder>/task-manager-js
```

### Run the CLI
```bash
node main.js
```

### Resetting Sample Data
- Tasks persist in `data/tasks.json`
- Expenses persist in `data/expenses.json`
- To start fresh, replace either file with `[]` (an empty JSON array) before relaunching the CLI

## CLI Navigation
```
Main Menu
1. Manage Tasks
2. Manage Expenses
3. Exit

Task Menu
1. Add Task          6. List Overdue Tasks
2. List Tasks        7. Filter Tasks by Category
3. Update Task       8. Mark Task as Complete
4. Remove Task       9. List Grouped Tasks
5. Status Count     10. Search Task
                   11. Go Back

Expenses Menu
1. Add Expense       6. Filter by Date Range
2. List Expenses     7. Show Total Spending
3. Update Expense    8. Show Summary by Category
4. Remove Expense    9. Go Back
5. Filter by Category
```

## Mock API Layer
- `api/taskApi.js` and `api/expenseApi.js` mimic asynchronous API calls using `fs/promises` under the hood.
- Each function (`getAll*`, `add*`, `update*`, `remove*`) works like a typical REST endpoint, but reads and writes local JSON files instead of hitting a network service.
- This mock API approach keeps the CLI UI realistic while remaining fully self-contained for demos or tutorials.

## Project Structure
```
task-manager-js/
├── api/                # Mock API modules (file-backed repositories)
│   ├── expenseApi.js
│   └── taskApi.js
├── cli/                # Interactive flows and shared prompt utilities
│   ├── common.js
│   ├── expenseCliHelper.js
│   └── taskCliHelper.js
├── data/               # Persisted JSON data for tasks and expenses
│   ├── expenses.json
│   └── tasks.json
├── models/             # Domain models with parsing/formatting helpers
│   ├── Expense.js
│   └── Task.js
├── idGenerator.js      # Simple sequential ID generator factory
├── main.js             # Entry point with Task/Expense menus
└── package.json        # Declares ES module usage
```

## Data Storage
- JSON files are easy to version control, diff, and share with collaborators.
- Sample data is preloaded to demonstrate reporting features (overdue tasks, date range filters, totals).
- Because persistence is local, you can duplicate the project folder to keep separate personal datasets.

## Development Notes
- No third-party dependencies are required; everything runs on the Node.js standard library.
- Interactive prompts rely on `readline`; remember to exit menus properly to close the interface.
- ID generation is abstracted via `idGenerator.js`, allowing tasks and expenses to maintain separate sequences.
- The codebase uses modern JavaScript (ES modules, async/await) to keep logic readable and test-friendly.

## Roadmap Ideas
- Persist data to a real database or cloud API instead of flat files.
- Add automated tests around CLI flows and mock API behavior.
- Support additional reports (monthly breakdowns, recurring expense reminders, calendar exports).
- Package the CLI with npm scripts or a binary wrapper for easier distribution.
- Extend validation (for example, enforcing numeric amounts or standardized status values).
