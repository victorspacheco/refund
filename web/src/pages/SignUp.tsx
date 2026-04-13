import { z, ZodError } from "zod"
import { api } from "../services/api"
import { AxiosError } from "axios"


import { useState } from "react"
import { useNavigate } from "react-router"


import { Input } from "../components/Input"
import { Button } from "../components/Button"


const signUpSchema = z.object({
  name: z.string().trim().min(1, {message: "Informe o nome"}),
  email: z.string().email({message: "Informe um email válido"}),
  password: z.string().min(6, {message: "Senha deve ter pelo menos 6 dígitos"}),
  passwordConfirm: z.string().min(6, { message: "Senha deve ter pelo menos 6 dígitos"})
}).refine((data) => data.password === data.passwordConfirm, {
  message: "As senhas precisam ser iguas",
  path: ["passwordConfirm"]
})


export function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setIsLoading(true)

      const data = signUpSchema.parse({
        name,
        email,
        password,
        passwordConfirm
      })

      await api.post("/users", data)

      if(confirm("Cadastrado com suceso! Deseja ser redirecionado para a tela de Signin?")) {
        navigate("/")
      }

    } catch (error) {
      console.log(error)

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message)
      }

      if(error instanceof ZodError) {
        return alert(error.issues[0].message)
      }

      alert("Não foi possível cadastrar a conta de usuário")
    }

    finally {
      setIsLoading(false)
    }
    
  }


  return(
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input 
        required 
        legend="Nome"  
        placeholder="Seu nome"
        onChange={(e) => setName(e.target.value)}
        />

      <Input 
        required 
        legend="E-mail" 
        type="email" 
        placeholder="seu@email.com"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input 
        required 
        legend="Senha" 
        type="password" 
        placeholder="123456"
        onChange={(e) => setPassword(e.target.value)}
        />

      <Input 
        required 
        legend="Confirme sua senha" 
        type="password" 
        placeholder="123456"
        onChange={(e) => setPasswordConfirm(e.target.value)}
        />

      <Button type="submit" isloading={isLoading}>
        Entrar
      </Button>

      <a 
        href="/"
        className="text-sm text-center font-medium text-gray-100 mt-3 mb-2 hover:text-green-800 transition ease-linear"
      >
        Já possuo conta
      </a>
    </form>
    
  )
}