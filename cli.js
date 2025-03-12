// cli.js
import inquirer from 'inquirer'
import {
  addTask,
  listTasks,
  markTaskAsCompleted,
  removeTask,
} from './controllers/task-controller.js'

const menu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
        'Add tasks',
        'List tasks',
        'Mark as completed',
        'Remove task',
        'Exit',
      ],
    },
  ])

  if (action === 'Add tasks') {
    const { title } = await inquirer.prompt([
      { type: 'input', name: 'title', message: 'Insert task description' },
    ])
    await addTask(title)
  }

  if (action === 'List tasks') {
    await listTasks()
  }

  if (action === 'Mark as completed') {
    const { id } = await inquirer.prompt([
      { type: 'input', name: 'id', message: 'Insert task ID completed:' },
    ])
    await markTaskAsCompleted(id)
  }

  if (action === 'Remove task') {
    const { id } = await inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        message: 'Enter the id of the task to remove:',
      },
    ])
    await removeTask(id)
  }

  if (action !== 'Exit') {
    menu()
  }
}

export default menu
