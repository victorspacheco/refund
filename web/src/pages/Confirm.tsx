import { Navigate, useLocation } from "react-router"

import okSvg from "../assets/ok.svg"


export function Confirm() {

  const location = useLocation()

  if(!location.state?.fromSubmit) {
    return <Navigate to="/"/>
  }

  return(
    <div className="bg-gray-500 flex flex-col rounded-xl items-center p-10 gap-6 w-full max-w-[512px]">

      <h1 className="text-2xl font-bold text-center text-green-100">Solicitação enviada!</h1>

      <img src={okSvg} alt="ícone ok" className="w-28" />

      <p className="text-sm text-gray-200 text-center"> Agora é apenas aguardar! Sua solicitação será analisada e, em breve, o setor financeiro irá entrar em contato com você</p>

      <a href="/" className="w-full p-3 text-center bg-green-100 rounded-lg text-white hover:bg-green-200 transition ease-linear">Nova solicitação</a>

    </div>
  )
}