import { Task } from './task.model'
import { loadTasks, saveTasks } from './task.file'

export function addTask(description: string): void {
  const tasks = loadTasks()

  const newTask: Task = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    description,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  tasks.push(newTask)
  saveTasks(tasks)

  console.log('✅ Tarefa adicionada com sucesso:')
  console.log(newTask)
}

export function listTasksByStatus(
  status: 'todo' | 'in-progress' | 'done',
  label: string
): void {
  const tasks = loadTasks()
  const filtered = tasks.filter((task) => task.status === status)

  if (filtered.length === 0) {
    console.log(`⚠️ Nenhuma tarefa ${label}.`)
    return
  }

  console.log(`📋 Tarefas ${label}:`)
  for (const task of filtered) {
    console.log(`- (${task.id}) ${task.description}`)
  }
}

export function updateTaskStatus(
  id: number,
  newStatus: 'in-progress' | 'done'
): void {
  const tasks = loadTasks()

  const taskIndex = tasks.findIndex((task) => task.id === id)

  if (taskIndex === -1) {
    console.log(`❌ Nenhuma tarefa encontrada com ID ${id}.`)
    return
  }

  tasks[taskIndex].status = newStatus
  tasks[taskIndex].updatedAt = new Date().toISOString()

  saveTasks(tasks)

  console.log(`✅ Tarefa ${id} atualizada para status: ${newStatus}`)
}

export function updateTaskDescription(
  id: number,
  newDescription: string
): void {
  const tasks = loadTasks()

  const taskIndex = tasks.findIndex((task) => task.id === id)

  if (taskIndex === -1) {
    console.log(`❌ Nenhuma tarefa encontrada com ID ${id}.`)
    return
  }

  tasks[taskIndex].description = newDescription
  tasks[taskIndex].updatedAt = new Date().toISOString()

  saveTasks(tasks)

  console.log(`✅ Descrição da tarefa ${id} atualizada com sucesso:`)
  console.log(`📝 ${newDescription}`)
}

export function removeTask(id: number): void {
  const tasks = loadTasks()

  const taskIndex = tasks.findIndex((task) => task.id === id)

  if (taskIndex === -1) {
    console.log(`❌ Nenhuma tarefa encontrada com ID ${id}.`)
    return
  }

  const removed = tasks.splice(taskIndex, 1)[0]

  saveTasks(tasks)

  console.log(`🗑️ Tarefa ${id} removida com sucesso:`)
  console.log(`- ${removed.description}`)
}
