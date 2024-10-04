export default function TaskDelete({ isOpen, onDelete, onClose, id }) {
    const buttons = [
        {
            text: 'Cancelar',
            className: 'bg-slate-300 text-black hover:bg-slate-400',
            onClick: onClose
        },
        {
            text: 'Deletar',
            className: 'bg-red-500 hover:bg-red-600',
            onClick: () => (onDelete(id))
        },
    ]

    return (
        <>
            {isOpen &&
                <div className="fixed z-10 top-0 bg-opacity-25 bg-black" >
                    <div className="relative p-12 flex justify-center items-center h-screen w-screen">
                        <div className={`bg-slate-800 relative text-white  flex flex-col min-h-[100px]  rounded-xl p-6`}>
                            <h1 className="text-xl">Deseja mesmo deletar a tarefa?</h1>
                            <div className="w-full flex mt-4 gap-4">
                                {
                                    buttons.map(btn => {
                                        return <button key={btn.text} onClick={btn.onClick} className={`${btn.className} w-[50%] py-2 px-4 rounded-xl`}>{btn.text}</button>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}