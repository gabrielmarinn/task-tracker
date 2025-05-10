import * as fs from 'fs'
import * as path from 'path'
import { Task } from './task.model'

const filePath = path.join(__dirname, '..', 'task.json')

export function loadTasks(): Task[] {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8')
  }

  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

export function saveTasks(tasks: Task[]): void {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf-8')
}
