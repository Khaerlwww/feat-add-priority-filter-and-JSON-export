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
