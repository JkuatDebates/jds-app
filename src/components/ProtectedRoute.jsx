import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({allowedRoles}){
    const {currentUser}= useSelector((state)=>state.user);
    if(!currentUser)
        return <Navigate to='/login' replace/>;

    if(allowedRoles && !allowedRoles.includes(currentUser.role))
        return <Navigate to='/' replace/>;

    return <Outlet/>;
}