"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = load;
exports.save = save;
const fs_1 = __importDefault(require("fs"));
const FILE = './tasks.json';
function load() {
    if (!fs_1.default.existsSync(FILE))
        return [];
    return JSON.parse(fs_1.default.readFileSync(FILE, 'utf-8'));
}
function save(tasks) {
    fs_1.default.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}
