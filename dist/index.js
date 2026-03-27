"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("./storage");
const [, , cmd, ...args] = process.argv;
const tasks = (0, storage_1.load)();
if (cmd === 'add') {
    const priorityFlag = args.indexOf('--priority');
    const priority = priorityFlag !== -1 ? args[priorityFlag + 1] : 'medium';
    const title = args.filter((_, i) => i !== priorityFlag && i !== priorityFlag + 1).join(' ');
    const task = { id: Date.now(), title, priority, done: false, createdAt: new Date().toISOString() };
    tasks.push(task);
    (0, storage_1.save)(tasks);
    console.log(`Added: "${title}" [${priority}]`);
}
else if (cmd === 'list') {
    tasks.forEach(t => {
        const icon = t.done ? 'v' : 'o';
        console.log(`${icon} [${t.priority.toUpperCase()}] ${t.title}`);
    });
}
else if (cmd === 'done') {
    const id = Number(args[0]);
    const t = tasks.find(t => t.id === id);
    if (t) {
        t.done = true;
        (0, storage_1.save)(tasks);
        console.log(`Marked done: ${t.title}`);
    }
}
else if (cmd === 'export') {
    console.log(JSON.stringify(tasks, null, 2));
}
