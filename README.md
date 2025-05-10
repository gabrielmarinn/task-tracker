# 📝 Task Tracker CLI (Node.js + TypeScript)

Este é um projeto de linha de comando (CLI) desenvolvido em **Node.js com TypeScript puro**, sem bibliotecas externas, para **gerenciar tarefas pessoais** de forma prática e persistente via `tasks.json`.

---

## 📁 Estrutura do Projeto

```
task-tracker/
├── src/
│   ├── cli.ts                # Entrada principal da aplicação
│   ├── task.model.ts         # Interface da tarefa (Task)
│   ├── task.file.ts          # Funções de leitura e escrita em JSON
│   └── task.service.ts       # Lógica de manipulação das tarefas
├── tasks.json                # Arquivo que armazena as tarefas
├── package.json              # Script de execução
├── tsconfig.json             # Configuração do TypeScript
```

---

## 📦 Instalação

```bash
git clone <repo-url>
cd task-tracker

npm install
npx tsc --init  # se ainda não existir tsconfig.json
```

Configure seu `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "types": ["node"]
  }
}
```

Crie o script no `package.json`:
```json
"scripts": {
  "start": "tsc && node dist/cli.js"
}
```

---

## ✅ Comandos Disponíveis

| Comando                                     | Ação                                                                 |
|--------------------------------------------|----------------------------------------------------------------------|
| `add "descrição"`                          | Adiciona uma nova tarefa com status "todo"                          |
| `remove <id>`                              | Remove a tarefa com o ID informado                                  |
| `update-status <id> in-progress|done`      | Atualiza o status da tarefa                                         |
| `update-description <id> "nova descrição"` | Atualiza o texto descritivo da tarefa                               |
| `list-todo`                                | Lista todas as tarefas não concluídas (status "todo")               |
| `list-progress`                            | Lista todas as tarefas em andamento (status "in-progress")          |
| `list-done`                                | Lista todas as tarefas concluídas (status "done")                   |

---

## 📂 Estrutura de uma Tarefa

```ts
interface Task {
  id: number
  description: string
  status: 'todo' | 'in-progress' | 'done'
  createdAt: string
  updatedAt: string
}
```

---

## 🧠 Lógica por Módulo

- `task.model.ts`: define a interface da tarefa.
- `task.file.ts`: leitura e escrita do arquivo JSON.
- `task.service.ts`: lógica de manipulação (add, remove, update, listar).
- `cli.ts`: ponto de entrada, interpreta os comandos da linha de comando.

---

## 🧪 Exemplos de Uso

```bash
npm run start -- add "Estudar Node.js puro"
npm run start -- update-status 1 done
npm run start -- update-description 1 "Estudar CLI com Node.js e TS"
npm run start -- list-todo
npm run start -- list-progress
npm run start -- list-done
npm run start -- remove 1
```

---

## 🧩 Considerações

- Projeto 100% feito com Node.js + TypeScript, sem bibliotecas externas.
- Armazenamento local em `tasks.json`.
- Modularizado e fácil de manter/expandir.
