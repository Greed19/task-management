import {create} from 'zustand';
import { addTaskToLocal, deleteTasks, getTasks, saveToLocal, statusUpdate, updateTasks } from '~/utils/handleSave';
export interface Task {
    id: string,
    title: string,
    description: string,
    status: string
}
export interface TaskUpdate {
    title: string,
    description: string
}
export interface TaskStore {
    tasks: Task[],
    addTask: (newTask: Task) => void
    changeStats: (id:string,updateStats: string) => void
    deleteTasks: (id:string) => void
    editTask: (id:string,updatedTask: TaskUpdate) => void
}
export const useTaskStore = create<TaskStore>()((set) => ({
    tasks: JSON.parse(localStorage.getItem('tasksArray') || "[]"),
    addTask : (newTask:Task) => {
            set((state) => {
                addTaskToLocal(newTask)
                return {tasks: [...state.tasks,newTask ]}
            })
    },
    deleteTasks: (id:string) => {
        set((state) => {
            deleteTasks(id)
            return({tasks: state.tasks.filter(item => item.id !== id)})
        })
    },
    changeStats : (id:string,updateStats: string) => {
        set((state) => {
            statusUpdate(id,updateStats)
            return  ({tasks: state.tasks.map((item) => item.id === id ? {...item,status:updateStats} : item)})
        })
    },
    editTask: (id:string,updatedTask:TaskUpdate) => {
        set((state) => {
            updateTasks(id,updatedTask)
            return ({tasks: state.tasks.map(item => item.id === id ? {...item,...updatedTask} : item)})
        })
    }
}))