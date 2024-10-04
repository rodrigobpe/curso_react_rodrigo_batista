import { X } from "lucide-react";
import { useState } from "react";

export default function TaskAddEdit({ isOpen, setIsOpen, type, onSubmit, task }) {
    const [isDone, setIsDone] = useState(false)
    const today = new Date(Date.now() - 1080000).toISOString().split("T")[0]

    const toggleModal = () => {
        setIsOpen((element) => { return { ...element, isOpen: false } })
    }

    const handleClickIsDone = () => {
        return setIsDone(!isDone)
    }


    return (
        <>
            {isOpen &&
                <div className="fixed z-10 top-0 bg-opacity-25 bg-black" >
                    <div className="relative p-12 flex justify-center items-center h-screen w-screen">
                        <div className={`bg-slate-800 relative text-white  flex flex-col min-h-[300px] w-[400px] rounded-xl p-6`}>
                            <X onClick={toggleModal} className="cursor-pointer absolute top-7 right-6 hover:text-red-600" />
                            {type === 'add'
                                && <>
                                    <h1 className={`text-2xl mb-4`}>Insira uma nova tarefa</h1>
                                    <form onSubmit={(e) => onSubmit(e, type,undefined)} className={`flex flex-col gap-2`}>
                                        <label htmlFor="title">Título</label>
                                        <input className="text-black py-3 px-2 rounded-xl" type="text" name="title" id="title" />
                                        <label htmlFor="content">Conteúdo</label>
                                        <textarea type="text" className="text-black p-2 rounded-xl" name="content" id="content" />
                                        <label htmlFor="date">Data</label>
                                        <input type="date" className="text-black py-3 px-2 rounded-xl" name="date" id="date" defaultValue={today} />
                                        <label htmlFor="isDone">Foi executado?</label>
                                        <div className="relative inline-block w-11 h-5">
                                            <input defaultChecked={isDone} onClick={handleClickIsDone} id="isDone" type="checkbox" className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-blue-700 cursor-pointer transition-colors duration-300" />
                                            <label htmlFor="isDone" className="absolute top-0 left-0 w-5 h-5 bg-slate-300 rounded-full border border-white shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-blue-700 cursor-pointer">
                                            </label>
                                        </div>
                                        <button className={`px-2 py-3 mt-4 rounded-xl bg-blue-600`} type="submit">Criar</button>
                                    </form>
                                </>
                            }

                            {type === 'edit'
                                && <>
                                    <h1 className={`text-2xl mb-4`}>Insira uma nova tarefa</h1>
                                    <form onSubmit={(e) => onSubmit(e, type,task.id)} className={`flex flex-col gap-2`}>
                                        <label htmlFor="title">Título</label>
                                        <input className="text-black py-3 px-2 rounded-xl" type="text" name="title" id="title" defaultValue={task.title} />
                                        <label htmlFor="content">Conteúdo</label>
                                        <textarea type="text" className="text-black p-2 rounded-xl" name="content" id="content" defaultValue={task.content} />
                                        <label htmlFor="date">Data</label>
                                        <input type="date" className="text-black py-3 px-2 rounded-xl" name="date" id="date" defaultValue={task.date.split("T")[0]} />
                                        <label htmlFor="isDone">Foi executado?</label>
                                        <div className="relative inline-block w-11 h-5">
                                            <input defaultChecked={task.isDone} onClick={handleClickIsDone} id="isDone" type="checkbox" className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-blue-700 cursor-pointer transition-colors duration-300" />
                                            <label htmlFor="isDone" className="absolute top-0 left-0 w-5 h-5 bg-slate-300 rounded-full border border-white shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-blue-700 cursor-pointer">
                                            </label>
                                        </div>
                                        <button className={`px-2 py-3 mt-4 rounded-xl bg-blue-600`} type="submit">Editar</button>
                                    </form>
                                </>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}