import { Check, Icon, X, TriangleAlert } from "lucide-react";

export default function Toast({ isOpen, message, type }) {
    return (
        <>
            {isOpen &&
                <div className={`flex items-center z-10 fixed top-10 right-3 gap-2 w-[350px] min-h-20 py-2 px-4 bg-white rounded-xl animate-fade-left animate-duration-300 animate-ease-linear `}>
                    {
                        type === 'add' && <Check className="h-10 w-10 rounded-full text-green-600 p-2 bg-green-200" />
                    }
                    {
                        type === 'delete' && <X className="h-9 w-10 rounded-full text-red-600 p-2 bg-red-200" />
                    }
                    {
                        type === 'warnning' && <TriangleAlert className="h-10 w-10 rounded-full text-yellow-600 p-2 bg-yellow-200" />
                    }
                    <h1>{message}</h1>
                </div>
            }
        </>
    )
}
