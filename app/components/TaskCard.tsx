import { useState } from "react"
import { useTaskStore, type Task } from "~/store/tasks"

const TaskCard = ({task}:{task:Task}) => {
    const {title,description,status,id} = task
    const {changeStats,deleteTasks,editTask} = useTaskStore()
    const [isEdit, setIsEdit] = useState(false)
    const [updatedTasks,setUpdatedTask] = useState({
        title,
        description
    })
    const onChangeStats = () => {
        if(status === 'completed') return
        changeStats(id,'completed')
    }
    const onChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setUpdatedTask(prev => ({...prev,[name]:value}))
    }
    const onEdit = () => {
        editTask(id,updatedTasks)
        if(isEdit) setUpdatedTask(prev => ({...prev,status,title}))
        setIsEdit(prev => !prev)
    }
  return (
    <section className="w-full p-[20px] my-[10px] flex m-auto text-black border-1 rounded-sm items-center justify-center">
        <div className="flex flex-col flex-1">
            <div className="flex w-full justify-between pr-[10px]">
                {
                    isEdit ? <>
                        <input
                    type="text"
                    value={updatedTasks.title}
                    name="title"
                    onChange={onChange}
                    required
                    className=""
                    />
                    </> :<h3 className="truncate w-1/4">{title}</h3>
                }
                <p className="ml-[5rem]">{status}</p>
            </div>
        {
            isEdit ? <>
                   <input
                    type="text"
                    value={updatedTasks.description}
                    name="description"
                    max={250}
                    onChange={onChange}
                    />
        </>: <p>{description}</p>}
        </div>
        <div className="flex justify-around gap-[10px]">
            <button className="border-2 bg-btn-gradient p-2" onClick={onEdit}>{isEdit ? 'SAVE':'EDIT'}</button>
            <button className="border-2 bg-btn-gradient p-2" onClick={onChangeStats}>COMPLETE</button>
            <button className="border-2 bg-btn-gradient p-2" onClick={() => deleteTasks(id)}>DELETE</button>
        </div>
    </section>
  )
}
export default TaskCard