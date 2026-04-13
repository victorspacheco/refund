import { useAuth } from "../hooks/useAuth";
import { BrowserRouter, Route } from "react-router";

import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./ManagerRoutes";
import { Loading } from "../components/Loading";


const isLoading = false

export function Routes() {

  const {session, isLoading} = useAuth()


  function Route() {
    switch (session?.user.role) {
      case "manager":
        return <ManagerRoutes/>

      case "employee":
        return <EmployeeRoutes/>
    
      default:
        return <AuthRoutes/>;
    }
  }

  if(isLoading) {
    return <Loading/>
  }

  return(
    <BrowserRouter>
      <Route/>
    </BrowserRouter>
  )
}