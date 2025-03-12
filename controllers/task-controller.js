import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const FILE_PATH = path.join(__dirname, '../task.json')

const ensureFileExists = async () => {
  try {
    await fs.access(FILE_PATH)
  } catch {
    await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2))
  }
}

export const loadTasks = async () => {
  await ensureFileExists()
  try {
    const data = await fs.readFile(FILE_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.log(chalk.red('Error loading tasks:'), error)
  }
}

export const saveTasks = async (tasks) => {
  try {
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2))
  } catch (error) {
    console.log(chalk.red('Error saving tasks:'), error)
  }
}

export const addTask = async (title) => {
  if (!title) {
    console.log(chalk.red('Error: task description is mandatory.'))
    return
  }

  const tasks = await loadTasks()
  const newTask = { id: tasks.length + 1, title, completed: false }

  tasks.push(newTask)
  await saveTasks(tasks)
  console.log(chalk.green('Task add!'))
}

// Listar tarefas
export const listTasks = async () => {
  const tasks = await loadTasks()
  console.log(chalk.blue('\nTask list:'))
  tasks.forEach((task) => {
    const status = task.completed ? chalk.green('[✔]') : chalk.red('[ ]')
    console.log(`${status} ${task.id}. ${task.title}`)
  })
}

// Marcar tarefa como concluída
export const markTaskAsCompleted = async (id) => {
  const tasks = await loadTasks()
  const task = tasks.find((t) => t.id == id)
  if (task) {
    task.completed = true
    await saveTasks(tasks)
    console.log(chalk.green('Task completed!'))
  } else {
    console.log(chalk.red('Invalid ID!'))
  }
}

// Remover tarefa
export const removeTask = async (id) => {
  const tasks = await loadTasks()
  const newTasks = tasks.filter((t) => t.id != id)
  await saveTasks(newTasks)
  console.log(chalk.yellow('Task removed!'))
}
