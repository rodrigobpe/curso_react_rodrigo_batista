import { useState } from "react"
import { useLogin } from "./login"

export const useTasks = () => {
    const [tasks, setTasks] = useState([])
    const [id, setId] = useState(() => Math.floor(Math.random() * 10000))
    const [loading, setLoading] = useState(false)
    const [propsTaskAddEdit, setPropsIsTaskAddEdit] = useState({ isOpen: false, type: 'add', })
    const [filterTasks, setFilterTasks] = useState([])

    const { user } = useLogin()


    const toggleModal = (e) => {
        return setPropsIsTaskAddEdit({ ...propsTaskAddEdit, isOpen: !propsTaskAddEdit.isOpen, task: undefined, type: 'add' })
    }

    const handleEditTask = (task) => {
        return setPropsIsTaskAddEdit({ ...propsTaskAddEdit, isOpen: !propsTaskAddEdit.isOpen, task, type: 'edit' })
    }

    const getAllTasksByUser = async () => {
        setLoading((loading => loading = true))
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.BASE_URL}/users/${user.id}`, {
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const { data } = await res.json()
        setTasks(data.tasks)
        setLoading((loading => loading = false))
    }

    const createNewTask = async ({ title, content, date, isDone }) => {
        const res = await fetch(`${process.env.BASE_URL}/users/${user.id}/tasks`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title, content, date, isDone })
        })

        const data = await res.json()

        if (data.error) return { error: true, message: data.error }
        getAllTasksByUser();

        return { error: false }
    }

    const deleteTask = async (id) => {
        const res = await fetch(`${process.env.BASE_URL}/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })

        const data = await res.json()

        if (data.error) return { error: true, message: data.error }
        getAllTasksByUser();

        return { error: false }

    }

    const updateTask = async ({ id, title, content, isDone, dueDate }) => {
        const res = await fetch(`${process.env.BASE_URL}/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title, content, isDone, dueDate })
        })

        const data = await res.json()

        if (data.error) return { error: true, message: data.error }

        getAllTasksByUser()
        return { error: false }
    }

    const updateToggleTask = async ({ id, title, content, isDone, dueDate }) => {
        const res = await fetch(`${process.env.BASE_URL}/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title, content, isDone, dueDate })
        })

        const data = await res.json()

        if (data.error) return { error: true, message: data.error }

        const refreshTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, isDone }
            }
            return task
        })

        setTasks(refreshTasks)

        return { error: false }
    }


    return {
        tasks,
        propsTaskAddEdit,
        loading,
        setTasks,
        toggleModal,
        handleEditTask,
        setPropsIsTaskAddEdit,
        getAllTasksByUser,
        createNewTask,
        deleteTask,
        updateTask,
        updateToggleTask,
        filterTasks,
        setFilterTasks,
        setLoading,
    }
}