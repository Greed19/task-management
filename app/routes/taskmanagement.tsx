import { useEffect } from "react"
import TaskCard from "~/components/TaskCard"
import TaskInputForm from "~/components/TaskInputForm"
import { useTaskStore, type Task } from "~/store/tasks"
import { getTasks } from "~/utils/handleSave"

export default function TaskManagement(){
    const {tasks } = useTaskStore()

    return (
        <section className="bg-amber-500 h-screen w-full flex flex-col items-center justify-start overflow-hidden p-[20px]">
            <h2>Task Management</h2>
            <TaskInputForm />
            <div className="flex flex-col overflow-hidden h-[70%]">
                <div className="overflow-y-scroll">
                {
                    tasks.length > 0 ? tasks.map((task:Task,index:number) => (
                        <TaskCard task={task} />
                    )) : null
                }
                </div>
            </div>
        </section>
    )
}