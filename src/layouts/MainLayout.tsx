import { Outlet } from "react-router"

const MainLayout = () => {
    return (
        <>
            <Outlet />
            <div className="h-16 bg-blue-500 sticky bottom-0"></div>
        </>
    )
}

export default MainLayout