import { Navigate, Outlet } from "react-router-dom";
import { GuardedRouteProps } from "./GuardedRouteProps";

function GuardedRoute({ isAllowed, redirectPath }: GuardedRouteProps) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
}

export default GuardedRoute;
