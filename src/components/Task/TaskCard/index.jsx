import { Clock, Pencil, Trash2, Check } from 'lucide-react'
import { useLogin } from '../../../hooks/login'

export default function TaskCard({ id, title, content, owner, dueDate, createdAt, isDone, onEdit, onRemove, onToggleIsDone }) {
    const { user } = useLogin()
    const maxLengthContent = 100
    const daysDifference = Math.ceil((new Date(`${dueDate}`).getTime() - new Date(Date.now() - 10800000).getTime())/86400000)

    return (
        <>
            <div className={`flex flex-col justify-between relative min-h-[10rem] rounded-xl outline outline-1 outline-slate-500/20 cursor-pointer p-4 bg-slate-500/10 hover:bg-slate-500/15 ${daysDifference >= 4 && !isDone ? 'border-green-600 border-l-4' : ''} ${(daysDifference >= 0 && daysDifference < 4) && !isDone ? 'border-yellow-500 border-l-4' : ''}${daysDifference < 0 && !isDone ? 'border-red-600 border-l-4' : ''}`}>
                <div className={`flex z-10 gap-2 absolute text-slate-600 right-3`}>
                    <Check onClick={() => onToggleIsDone({ id, isDone, title, content, dueDate })} className={`hover:text-green-300 ${isDone ? "text-green-400" : ""}`} />
                    <Pencil onClick={() => onEdit({ id, title, content, owner, dueDate, isDone })} className={`h-5 w-5 hover:text-blue-700`} />
                    <Trash2 onClick={() => onRemove(id)} className={`h-5 w-5 hover:text-red-700`} />
                </div>
                <h1 className={`truncate text-white text-xl max-w-[78%]`}>{title}</h1>
                <p className={`my-2 text-start break-words text-slate-500`}>{content.length >= maxLengthContent ? content.slice(0, maxLengthContent).trim() + "..." : content}</p>
                <div className={`flex justify-between items-end`}>
                    <span className={`flex justify-center items-center h-10 w-10 border border-slate-700 text-white  rounded-full p-2 bg-slate-950`}>
                        <p>{user.name.charAt(0).toUpperCase()}</p>
                    </span>
                    <div className={`flex gap-2 justify-center  text-slate-400 `}>
                        <Clock className={`h-4 w-4`} />
                        <p className={"text-xs"}>{dueDate.split("T")[0].replaceAll("-", "/")}</p>
                    </div>
                </div>
            </div>
        </>
    )
}