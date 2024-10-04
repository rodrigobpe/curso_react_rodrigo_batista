import { useReducer, useState } from "react"

export const useToast = () => {
    const [toastConfig, setToastConfig] = useState({
        isOpen: false,
        message: undefined,
        timeout: 3000,
        type: 'add'
    })

    // useReducer 


    const activeToast = ({ message, type }) => {
        const { isOpen, timeout } = toastConfig
        setToastConfig({ ...toastConfig, isOpen: !isOpen, message, type })

        return setTimeout(() => {
            resetMessage()
            return setToastConfig({ ...toastConfig, isOpen: false })
        }, timeout);
    }

    const resetMessage = () => {
        return setToastConfig({ ...toastConfig, message: undefined })
    }

    return {
        activeToast, toastConfig
    }
}