# Task Manager CLI

Task Manager CLI is a Node.js command-line application for tracking personal and work tasks. It stores data in a local JSON file (using Mock Api), making it easy to experiment without setting up a database.

## Features
- Add tasks with an auto-generated ID, title, optional due date, and category
- List every task with status, category, and human-readable due dates
- Update task details and change statuses directly from the CLI
- Remove tasks that are no longer relevant
- View a status breakdown to see how many tasks are pending or done
- Highlight overdue tasks based on their due date
- Filter tasks by category or search by keyword
- Mark tasks as complete and view pending/completed groups side by side

## Prerequisites
- Node.js 18 or later

## Getting Started
```bash
# Clone the repository
# (replace <folder> with the destination you want)
git clone <repo-url> <folder>
cd <folder>/task-manager-js
```

## Usage
```bash
node main.js
```

From the interactive menu you can:
- Manage tasks: add, list, update, delete
- Generate reports: status counts, overdue tasks, grouped lists
- Search and filter: by keyword or category

All data is saved to `data/tasks.json`. You can edit or version-control this file to share task lists.

## Project Structure
```
task-manager-js/
├── api/
│   └── taskApi.js        # File-backed persistence helpers
├── cli/
│   ├── cliHelper.js      # User-facing CLI flows
│   └── common.js         # Shared prompt utilities and ID generator setup
├── data/
│   └── tasks.json        # Sample task data (persisted between runs)
├── models/
│   └── Task.js           # Task domain model with helpers
├── idGenerator.js        # Simple sequential ID generator
├── main.js               # CLI entry point
└── package.json          # Module type configuration
```

## Tips
- Tasks without a due date are listed after dated tasks to keep upcoming deadlines in view.
- Status values are free-form, but the CLI assumes `pending` and `done` for reports.
- To start fresh, delete `data/tasks.json` (or replace it with an empty array) before launching the CLI.

## Future Ideas
- Add expense tracking (see `guide.txt` for original structure)
- Package the CLI with npm scripts for easier startup
- Add automated tests around the task API and CLI flows
