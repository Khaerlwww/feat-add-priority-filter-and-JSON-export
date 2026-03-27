import { load, save } from './storage';
import { Task, Priority } from './task';

const [,, cmd, ...args] = process.argv;
const tasks = load();

if (cmd === 'add') {
  const priorityFlag = args.indexOf('--priority');
  const priority: Priority = priorityFlag !== -1 ? args[priorityFlag + 1] as Priority : 'medium';
  const title = args.filter((_, i) => i !== priorityFlag && i !== priorityFlag + 1).join(' ');
  const task: Task = { id: Date.now(), title, priority, done: false, createdAt: new Date().toISOString() };
  tasks.push(task);
  save(tasks);
  console.log(`Added: "${title}" [${priority}]`);
} else if (cmd === 'list') {
  tasks.forEach(t => {
    const icon = t.done ? 'v' : 'o';
    console.log(`${icon} [${t.priority.toUpperCase()}] ${t.title}`);
  });
} else if (cmd === 'done') {
  const id = Number(args[0]);
  const t = tasks.find(t => t.id === id);
  if (t) { t.done = true; save(tasks); console.log(`Marked done: ${t.title}`); }
} else if (cmd === 'export') {
  console.log(JSON.stringify(tasks, null, 2));
}
