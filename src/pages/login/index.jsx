import Toast from "../../components/Toast";
import { useLogin, useToast } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const { toastConfig, activeToast } = useToast()
    const { loading, loginForms, setLoading, resetForms, authLogin } = useLogin()
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(loading => loading = !loading)
            const [email, password] = [e.target.email.value, e.target.password.value]
            const authentication = await authLogin({ email, password })

            if (authentication.error) return activeToast({ message: authentication.message, type: 'delete' })

            return navigate("/tasks")
        } catch (error) {
            return activeToast({ message: error, type: 'delete' })
        } finally {
            setLoading(loading => loading = false)
        }

    }

    return (
        <>
            <main className={`flex flex-col h-screen w-screen justify-center items-center`}>
                <form onSubmit={handleSubmit} method="POST" className={"w-[300px] flex flex-col text-white p-4 rounded-lg gap-2"}>
                    <h1 className=" text-3xl font-bold mb-4">Login</h1>
                    <label htmlFor="email">E-mail</label>
                    <input type="text" defaultValue={loginForms.email} className="text-black p-2 rounded-lg" id="email" />
                    <label htmlFor="email">Senha</label>
                    <input type="password" defaultValue={loginForms.password} className="text-black p-2 rounded-lg" id="password" />
                    <button type="submit" className="px-4 py-2 mt-4 border rounded-lg">
                        {loading ? <>
                            <div className="animate-spin inline-block size-5 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                                <span className="sr-only"></span>
                            </div>
                        </> : "Entrar"}
                    </button>
                    <Link to={"/sign-up"} type="submit" className="px-4 py-2 mt-4 text-center border rounded-lg bg-blue-700">
                        Criar conta
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