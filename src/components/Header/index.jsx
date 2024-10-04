import { Bell, LogOut } from "lucide-react";
import { useLogin } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { logout } = useLogin()
    const navigate = useNavigate()

    const buttonsHeader = [
        {
            name: "bell",
            icon: Bell,
            className: " bg-slate-700 hover:bg-slate-600",
            onClick: undefined
        },
        {
            name: "logout",
            icon: LogOut,
            className: " bg-red-700 hover:bg-red-600",
            onClick: () => (logout(navigate))
        },
    ]


    return (
        <>
            <header className={`flex justify-between items-center h-[6.25rem] px-[3rem] border-b border-slate-800`}>
                <p className={`text-white text-3xl`}>Notes</p>
                <div className="flex gap-2 items-center text-white">
                    <div className="flex gap-2 relative">
                        {
                            buttonsHeader.map((btn) => {
                                return <btn.icon key={btn.name} className={`${btn.className} h-10 w-10 p-2 rounded-full cursor-pointer`} onClick={btn.onClick} />
                            })
                        }
                        {/* <span className="flex justify-center items-center absolute h-5 w-5 bottom-[-10px] right-0 bg-slate-100 rounded-full">
                            <p className="text-xs text-black">{taskLenght > 0 ? taskLenght : 0}</p>
                        </span> */}

                    </div>
                </div>
            </header>
        </>
    )
}