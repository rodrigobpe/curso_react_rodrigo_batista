import { RouterProvider } from "react-router-dom"
import { createBrowserRouter, Navigate } from "react-router-dom";
import { TaskPage } from "./pages/tasks/index";
import { LoginPage } from "./pages/login";
import { SignUpPage } from "./pages/sign-up";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";



export const routes = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/sign-up',
    Component: SignUpPage
  },
  {
    Component: ProtectedRoutes,
    children: [
      {
        path: "/tasks",
        Component: TaskPage
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to={"/login"} replace />
  }
])


function App() {

  return (
    <>
      <RouterProvider router={routes} />
    </>

  )
}

export default App
