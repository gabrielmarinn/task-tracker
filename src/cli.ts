import {
  addTask,
  removeTask,
  updateTaskStatus,
  updateTaskDescription,
  listTasksByStatus,
} from './task.service'

const [, , action, ...args] = process.argv

switch (action) {
  case 'add':
    const description = args.join(' ')
    if (!description) {
      console.log('⚠️  Você precisa fornecer uma descrição da tarefa.')
    } else {
      addTask(description)
    }
    break

  case 'update-status':
    const id = Number(args[0])
    const status = args[1] as 'in-progress' | 'done'

    if (!id || !status || !['in-progress', 'done'].includes(status)) {
      console.log('⚠️ Uso incorreto. Exemplo:')
      console.log(' update-status 2 in-progress')
      console.log(' update-status 3 done')
    } else {
      updateTaskStatus(id, status)
    }
    break

  case 'update-description':
    const taskId = Number(args[0])
    const newDecription = args.slice(1).join(' ')

    if (!taskId || !newDecription) {
      console.log('⚠️ Uso incorreto. Exemplo:')
      console.log(" update-description 3 'Nova descrição da tarefa'")
    } else {
      updateTaskDescription(taskId, newDecription)
    }
    break

  case 'remove':
    const removeId = Number(args[0])

    if (!removeId) {
      console.log('⚠️ Uso incorreto. Exemplo:')
      console.log(' remove 3')
    } else {
      removeTask(removeId)
    }
    break

  case 'list-todo':
    listTasksByStatus('todo', 'não concluidas')
    break
  case 'list-progress':
    listTasksByStatus('in-progress', 'em andamento')
    break
  case 'list-done':
    listTasksByStatus('done', 'concluidas')
    break

  default:
    console.log('❌ Ação não reconhecida.')
    console.log('Comandos Disponíveis:')
    console.log("  add 'descrição'")
    console.log('  remove <id>')
    console.log('  update-status <id> <status>')
    console.log('  update-description <id> <descrição>')
    console.log('  list-todo | list-progress | list-done')
}
