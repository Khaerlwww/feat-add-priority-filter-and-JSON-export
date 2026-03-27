<<<<<<< HEAD
# feat-add-priority-filter-and-JSON-export
A minimal CLI task manager with priority flags and JSON export, built with TypeScript
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  priority: Priority;
  done: boolean;
  createdAt: string;
}
import fs from 'fs';
import { Task } from './task';

const FILE = './tasks.json';

export function load(): Task[] {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
}

export function save(tasks: Task[]): void {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}
import { load, save } from './storage';
import { Task, Priority } from './task';

const [,, cmd, ...args] = process.argv;

const tasks = load();

if (cmd === 'add') {
  const priorityFlag = args.indexOf('--priority');
  const priority: Priority = priorityFlag !== -1
    ? args[priorityFlag + 1] as Priority : 'medium';
  const title = args.filter((_, i) => i !== priorityFlag && i !== priorityFlag + 1).join(' ');
  const task: Task = { id: Date.now(), title, priority, done: false, createdAt: new Date().toISOString() };
  tasks.push(task);
  save(tasks);
  console.log(`✅ Added: "${title}" [${priority}]`);

} else if (cmd === 'list') {
  tasks.forEach(t => {
    const icon = t.done ? '✔' : '○';
    console.log(`${icon} [${t.priority.toUpperCase()}] ${t.title}`);
  });

} else if (cmd === 'done') {
  const id = Number(args[0]);
  const t = tasks.find(t => t.id === id);
  if (t) { t.done = true; save(tasks); console.log(`Marked done: ${t.title}`); }

} else if (cmd === 'export') {
  console.log(JSON.stringify(tasks, null, 2));
}
{
  "name": "taskify-cli",
  "version": "1.0.0",
  "description": "Minimal CLI task manager",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  },
  "license": "MIT"
}
```

**`.gitignore`**
```
node_modules/
dist/
tasks.json
=======
# Taskify CLI

A minimal CLI task manager with priority flags and JSON export, built with TypeScript.

## Usage
```bash
node dist/index.js add "Belajar Git" --priority high
node dist/index.js list
node dist/index.js export
```

## License
MIT
>>>>>>> c623012 (fix: separate source files and clean README)
