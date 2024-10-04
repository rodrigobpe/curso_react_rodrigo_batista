import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../../components/Header'
import TaskAddEdit from '../../components/Task/TaskAddEdit'
import TaskCard from '../../components/Task/TaskCard'
import { LogIn, Plus } from 'lucide-react'
import Toast from '../../components/Toast'
import TaskDelete from '../../components/Task/TaskDelete'
import { useTaskDelete, useTasks, useToast } from '../../hooks'
import { useNavigate } from 'react-router-dom'


export const TaskPage = () => {
    const { activeToast, toastConfig } = useToast()
    const { setTasks, tasks, handleEditTask, toggleModal, propsTaskAddEdit, setPropsIsTaskAddEdit, getAllTasksByUser, createNewTask, loading, setLoading, deleteTask, updateTask, filterTasks, setFilterTasks, updateToggleTask } = useTasks()
    const { handleOnClose, taskDeleteConfig, handleOpenModal, resetTaskDelete } = useTaskDelete()
    const [filter, setFilter] = useState("All")
    const navigate = useNavigate()
    const selectOptions = ['All', 'Done', 'To do']



    const handleSubmitNewEditTask = async (e, type, id) => {
        e.preventDefault()
        setLoading(loading => loading = true)
        const { date, title, content, isDone } = e.target
        if (type === 'add') {
            try {
                if (!date.value || !title.value || !content.value) return

                const newTask = await createNewTask({ title: title.value, content: content.value, date: new Date(date.value).toISOString(), isDone: isDone.checked })

                if (newTask.error) return activeToast({ message: newTask.message, type: 'delete' });

                activeToast({ message: 'Tarefa criada com sucesso!', type: 'add' })

                return setPropsIsTaskAddEdit({ ...propsTaskAddEdit, isOpen: false })

            } catch (error) {
                navigate("/login")
            } finally {
                return setLoading(loading => loading = false)
            }
        } else {
            try {
                const handleUpdateTask = await updateTask({ id, content: content.value, dueDate: new Date(date.value).toISOString(), isDone: isDone.checked, title: title.value })
                if (handleUpdateTask.error) return activeToast({ message: handleUpdateTask.message, type: 'delete' });
                setPropsIsTaskAddEdit({ ...propsTaskAddEdit, isOpen: false })

                return activeToast({ message: 'Tarefa editada com sucesso!', type: 'add' })
            } catch (error) {
                navigate("/login")
            } finally {
                setLoading(loading => loading = false)
            }


        }
    }

    const handleOnDelete = useCallback(async (id) => {
        try {
            setLoading(loading => loading = true)
            const handleDeleteTask = await deleteTask(id);
            if (handleDeleteTask.error) return activeToast({ message: handleDeleteTask.message, type: 'delete' });
            resetTaskDelete()
            return activeToast({ message: 'Tarefa deletada com sucesso!', type: 'add' })
        } catch (error) {
            navigate("/login")
        } finally {
            return setLoading(loading => loading = false)
        }
    }, []);

    const handleOnChangeStatusTask = useCallback((e) => {
        setFilter(prevFilter => prevFilter = e.target.value)
    }, []);


    const handleOnToggleIsDone = async ({ id, title, content, dueDate, isDone }) => {
        try {           
            const handleUpdateTask = await updateToggleTask({ id, content, dueDate, isDone: !isDone, title })

            if (handleUpdateTask.error) return activeToast({ message: handleUpdateTask.message, type: 'delete' })

            return
        } catch (error) {
            navigate("/login")
        }

    }

    useEffect(() => {
        getAllTasksByUser()
    }, [])

    useEffect(() => {
        onFIlterTask()
    }, [filter, tasks])


    const onFIlterTask = useCallback(() => {
        if (filter === 'All') {
            return setFilterTasks(tasks)
        } else if (filter == 'To do') {
            const filtered = tasks.filter((task) => (!task.isDone))

            return setFilterTasks(filtered)
        } else {
            const filtered = tasks.filter((task) => (task.isDone))

            return setFilterTasks(filtered)
        }
    })


    return (
        <>
            <Toast
                isOpen={toastConfig.isOpen}
                message={toastConfig.message}
                type={toastConfig.type}
            />
            <Header />
            <main className={`flex flex-col mx-[3rem] my-[1.5rem]`}>
                <div className='flex items-center gap-4 my-[1.5rem] text-white'>
                    <select onChange={(e) => (handleOnChangeStatusTask(e))} className='bg-slate-500/10 w-[80px] h-10 rounded-2xl flex justify-center items-center ' name="status_task" id="status_task">
                        {selectOptions.map(option => {
                            return <option key={option} className='bg-slate-900 border border-slate-500/15 text-center p-0' value={option}>{option}</option>
                        })}
                    </select>
                    <span className={"p-2 bg-slate-500/10 rounded-full min-w-[4.25rem] border border-slate-500/10 text-center"}>
                        {filterTasks.length}
                    </span>
                </div>

                {loading ?
                    <>
                        <section className="flex justify-center items-center h-[calc(100vh-400px)]">
                            <div className="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                                <span className="sr-only"></span>
                            </div>
                        </section>
                    </>
                    :
                    <>
                        <section className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid xl:grid-cols-3 2xl:grid-cols-4'>
                            {
                                filterTasks.map(task => {
                                    return <TaskCard key={task.id}
                                        title={task.title}
                                        id={task.id}
                                        owner={task.userId}
                                        isDone={task.isDone}
                                        dueDate={task.dueDate}
                                        createdAt={task.createdAt}
                                        content={task.content}
                                        onEdit={handleEditTask}
                                        onRemove={handleOpenModal}
                                        onToggleIsDone={handleOnToggleIsDone}
                                    />
                                })
                            }
                        </section>
                    </>

                }
                <button onClick={toggleModal} className={`h-16 w-16 flex justify-center items-center z-10 p-2 bg-blue-600 rounded-full fixed right-4 lg:right-6 bottom-6 text-white hover:bg-blue-700`} type='button'>
                    <Plus />
                </button>
            </main >
            <TaskAddEdit isOpen={propsTaskAddEdit.isOpen} type={propsTaskAddEdit.type} setIsOpen={setPropsIsTaskAddEdit} onSubmit={handleSubmitNewEditTask} task={propsTaskAddEdit.task} />
            <TaskDelete isOpen={taskDeleteConfig.isOpen} onClose={handleOnClose} onDelete={handleOnDelete} id={taskDeleteConfig.id} />
        </>
    )
}

