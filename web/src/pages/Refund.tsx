import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories"
import { useNavigate, useParams } from "react-router"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"
import { api } from "../services/api"

import { Input } from "../components/Input"
import { Select } from "../components/Select"
import { Upload } from "../components/Upload"
import { Button } from "../components/Button"
import fileSvg from "../assets/file.svg"

import { useEffect, useState } from "react"
import { formatCurrency } from "../utils/formatCurrency"

const RefundBodySchema = z.object({
  name: z.string().min(3, {message: "Informe um nome válido"}),
  category: z.string().min(1, {message: "Informe uma categoria"}),
  amount: z.coerce.number({message: "Informe um valor válido"}).positive({message: "Informe um número maior que 0"})
})



export function Refund() {
  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [value, setValue] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsloading] = useState(false)
  const [fileURL, setFileURL] = useState<string | null>(null)

  const navigate = useNavigate()
  const params = useParams<{ id: string }>()


  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if(params.id) {
      return navigate(-1)
    }

    
    try {
      setIsloading(true)

      if(!file) {
        return alert("Selecione um arquivo")
      }
      
      const data = RefundBodySchema.parse({
        name: name,
        category: category,
        amount: value.replace(",",".")
      })

      console.log("antes do upload", file)
      
      const fileUploadForm = new FormData()
      fileUploadForm.append("file", file)
      const response = await api.post("/uploads", fileUploadForm)

      console.log("depois do upload", response)

      console.log(response)

      await api.post("/refunds", {
        ...data, 
        filename: response.data.filename
      })

      console.log(data)
      navigate("/confirm", {state: { fromSubmit: true}})
      
    } catch (error) {
      console.log(error)

      if(error instanceof ZodError) {
        return alert(error.issues[0].message)
      }

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message)
      }
      
    } finally {
      setIsloading(false)
    }


  }

  async function fetchRefunds(id: string) {
    try {
      const { data } = await api.get<RefundAPIResponse>(`/refunds/${id}`)
      
      setName(data.name)
      setCategory(data.category)
      setValue(formatCurrency(data.amount))
      setFileURL(data.filename)
      
    } catch (error) {
      console.log(error)

      if(error instanceof AxiosError) {
        alert(error.response?.data.message)
      }

      alert("Não foi possível realizar ação")
    }
  }

  useEffect(() => {
    if(params.id){
      fetchRefunds(params.id)
    }
  }, [params.id])
  
  return(
    <form onSubmit={onSubmit} className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]">
      <header>
        <h1 className="text-xl font-bold text-gray-100">Solicitação de reembolso</h1> 

        <p className="text-sm text-gray-200 mt-2 mb-4">Dados da despesa para solicitar reembolso</p>

      </header>

      <Input required legend="Nome da solicitação" value={name} onChange={(e) => setName(e.target.value)} disabled={!!params.id}/>

      <div className="flex gap-4">

        <Select 
          required 
          legend="Categoria" 
          value={category} 
          disabled={!!params.id}
          onChange={(e) => setCategory(e.target.value)}>
          {
            CATEGORIES_KEYS.map((category) => (
              
              <option key={category} value={category}>
                  {CATEGORIES[category].name}
                </option>
              )
            )
          }
        </Select>

        <Input required legend="Valor" value={value} disabled={!!params.id} onChange={(e) => {setValue(e.target.value)}}/>
      </div>



      {params.id && fileURL ? (
        <a 
          href={`http://localhost:3333/uploads/${fileURL}`} 
          target="_blank"
          className="text-sm text-green-100 font-semibold flex justify-center items-center gap-2 my-6 hover:opacity-70 transition ease-linear"
        >
          <img src={fileSvg} alt="ícone de arquivo" />
          Ver comprovante
        </a>
        ) : (
         <Upload 
        filename={file && file.name} 
        onChange={(e) => e.target.files && setFile(e.target.files[0])}
      />)}
      


      <Button type="submit" isloading={isLoading}>
        {params.id? "Voltar" : "Enviar"}
      </Button>

    </form>
  )
}