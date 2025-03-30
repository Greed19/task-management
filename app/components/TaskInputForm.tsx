import { useState } from "react"
import { useTaskStore, type Task } from "~/store/tasks"
import { v4 as uuidv4 } from "uuid";

const TaskInputForm = () => {
    const {addTask} = useTaskStore()
    const initialState:Task = {
        id:'',
        title: '',
        description: '',
        status: 'pending'
    }
        
    const [task, setTask] = useState<Task>(initialState)
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setTask((prev) => ({...prev,[name]:value}))
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTask({...task,id:uuidv4()})
        setTask(initialState)
    }
  return (
    <form onSubmit={onSubmit} className=" h-1/4 w-full flex justify-around items-center">
        <div className="flex flex-col">
            <label htmlFor="">Task Title
                <input
                    type="text"
                    value={task.title}
                    name="title"
                    placeholder="Enter Your Task Title"
                    onChange={onChange}
                    required
                    className=""
                    />
            </label>
            <label htmlFor="">Task description
                <input
                    type="text"
                    value={task.description}
                    name="description"
                    placeholder="Enter Your description"
                    max={250}
                    onChange={onChange}
                    />
            </label>
        </div>
    <button type="submit" className="p-[20px] bg-amber-50 border-2 rounded-sm text-black">
        Add Task
    </button>
</form>
  )
}
export default TaskInputForm