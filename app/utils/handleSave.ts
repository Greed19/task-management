import type { Task, TaskUpdate } from "~/store/tasks";
export const LOCALKEY = 'tasksArray'

export const saveToLocal = (key:string, value: Task[]) => {
    localStorage.setItem(key,JSON.stringify(value))
}

export const getTasks = (key:string):Task[]=> {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
}
export const addTaskToLocal = (newTasks: Task) => {
    const tasks = getTasks(LOCALKEY)
    tasks.push(newTasks)
    saveToLocal(LOCALKEY,tasks)
}

export const deleteTasks = (id:string) => {
    const newTasks = getTasks(LOCALKEY)?.filter(item => item.id !== id)
    saveToLocal(LOCALKEY,newTasks)
}

export const updateTasks = (id:string,updateTask:TaskUpdate ) => {
    const updateTasks = getTasks(LOCALKEY).map(item => item.id === id ? {...item,...updateTask} : item)
    saveToLocal(LOCALKEY,updateTasks)
}

export const statusUpdate = (id:string, status: string) => {
    const updateTasks = getTasks(LOCALKEY).map(item => item.id === id ? {...item,status} : item)
    saveToLocal(LOCALKEY,updateTasks)
}
