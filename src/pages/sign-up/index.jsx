import { Link, useNavigate } from 'react-router-dom'
import { useLogin, useToast } from '../../hooks'
import Toast from '../../components/Toast'

export const SignUpPage = () => {
    const { toastConfig, activeToast } = useToast()
    const { loading, loginForms, setLoading, resetForms, authLogin, signUpForm,signUp } = useLogin()
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(loading => loading = !loading)
            const [email, password, name] = [e.target.email.value, e.target.password.value, e.target.name.value]
            const handleSignUpForm = await signUp({ email, password, name })

            if (handleSignUpForm.error) return activeToast({ message: handleSignUpForm.message, type: 'delete' })

            return navigate("/login")
        } catch (error) {
            return activeToast({ message: error.message, type: 'delete' })
        } finally {
            setLoading(loading => loading = false)
        }

    }

    return (
        <>
            <main className={`flex flex-col h-screen w-screen justify-center items-center`}>
                <form onSubmit={handleSubmit} method="POST" className={"w-[300px] flex flex-col text-white p-4 rounded-lg gap-2"}>
                    <h1 className=" text-3xl font-bold mb-4">Registrar-se</h1>
                    <label htmlFor="name">Nome</label>
                    <input type="text" defaultValue={signUpForm.email} className="text-black p-2 rounded-lg" id="name" />
                    <label htmlFor="email">E-mail</label>
                    <input type="text" defaultValue={signUpForm.email} className="text-black p-2 rounded-lg" id="email" />
                    <label htmlFor="email">Senha</label>
                    <input type="password" defaultValue={signUpForm.password} className="text-black p-2 rounded-lg" id="password" />
                    <button type="submit" className="px-4 py-2 mt-4 border rounded-lg">
                        {loading ? <>
                            <div className="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                                <span className="sr-only"></span>
                            </div>
                        </> : "Criar conta"}
                    </button>
                    <Link to={"/login"} type="submit" className="px-4 py-2 mt-4 text-center border rounded-lg bg-blue-700">
                        Login
                    </Link>
                </form>
            </main>
            <Toast
                isOpen={toastConfig.isOpen}
                message={toastConfig.message}
                type={toastConfig.type}
            />
        </>
    )
}