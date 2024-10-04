import { useState } from "react"

export const useTaskDelete = () => {
    const [taskDeleteConfig, setTaskDeleteConfig] = useState({
        isOpen: false,
        id: undefined
    })

    const handleOnClose = () => {
        return resetTaskDelete()
    }

    const handleOpenModal = (id) => {
        return setTaskDeleteConfig({ ...taskDeleteConfig, isOpen: true, id: id })

    }

    const resetTaskDelete = () => {
        return setTaskDeleteConfig({ ...taskDeleteConfig, isOpen: false, id: undefined })
    }

    return {
        taskDeleteConfig, handleOnClose, handleOpenModal, resetTaskDelete
    }
}