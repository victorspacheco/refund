import { useActionState } from "react"
import { string, z, ZodError } from "zod"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { api } from "../services/api"
import { AxiosError } from "axios"
import { useAuth } from "../hooks/useAuth"


const signInSchema = z.object({
  email: string().trim().email({message: "Informe um email válido"}),
  password: string().trim().min(6, {message: "Senha inválida"})
})


export function SignIn() {
  const [state, formAction, isLoading] = useActionState(signIn, null)

  const auth = useAuth()


  async function signIn(_: any, formData: FormData) {
    
    try {
      const data = signInSchema.parse({
        email: formData.get("email"),
        password: formData.get("senha")
      })

      const response = await api.post("/sessions", data)
      auth.save(response.data)

      
    } catch (error) {
      console.log(error)

      if(error instanceof ZodError) {
        return { message: error.issues[0].message }
      }

      if(error instanceof AxiosError) {
        return { message: error.response?.data.message}
      }

      return { message: "Não foi posssível entrar na conta" }
    }

  }


  return(
    <form action={formAction} className="w-full flex flex-col gap-4">
      <Input 
        name="email"
        required 
        legend="E-mail" 
        type="email" 
        placeholder="seu@email.com"
        />

      <Input 
        name="senha"
        required 
        legend="Senha" 
        type="password" 
        placeholder="123456"
        />

      <Button type="submit" isloading={isLoading}>
        Entrar
      </Button>

      <p className="text-sm font-medium text-red-800 text-center">{state?.message}</p>

      <a 
        href="/signup"
        className="text-sm text-center font-medium text-gray-100 mt-3 mb-2 hover:text-green-800 transition ease-linear"
      >
        Criar conta
      </a>
    </form>
    
  )
}