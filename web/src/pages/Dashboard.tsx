import { useEffect, useState } from "react"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import searchSvg from "../assets/search.svg"
import { RefundItem, type RefundItemProps } from "../components/RefundItem"
import { CATEGORIES } from "../utils/categories"
import { formatCurrency } from "../utils/formatCurrency"
import { Pagination } from "../components/Pagination"
import { api } from "../services/api"
import { AxiosError } from "axios"

const PER_PAGE = 4

export function Dashboard(){

  const [name, setName] = useState("")
  const [page, setPage] = useState(1)
  const [totalOfPage, setTotalOfPages] = useState(10)
  const [refunds, setRefunds] = useState<RefundItemProps[]>([])


  async function fetchRefunds() {
    try {
      const response = await api.get<RefundsPaginationAPIResponse>(`/refunds?name=${name.trim()}&page=${page}&perPage=${PER_PAGE}`)

      setRefunds(
        response.data.refunds.map((refund) => ({
          id: refund.id,
          name: refund.user.name,
          description: refund.name,
          category: refund.category,
          amount: formatCurrency(refund.amount),
          categoryImg: CATEGORIES[refund.category].icon,
        }))
      )

      setTotalOfPages(response.data.pagination.totalPages)
      
    } catch (error) {

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message)
      }

      alert("Não foi possível carregar os dados") 
    }
  }

  useEffect(() => {fetchRefunds()}, [page])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    fetchRefunds()
  }


  function handlePagination(action: "next" | "previous") {

    setPage((prevPage) => {
      if(action === "next" && prevPage < totalOfPage) {
        return prevPage + 1
      }

      if(action === "previous" && prevPage > 1) {
        return prevPage - 1 

      }

      return prevPage
    })
  }


  return(

    <div className="bg-gray-500 rounded-xl p-10 w-full max-w-[768px]">

      <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

      <form 
        onSubmit={onSubmit}
        className="flex flex-1 items-center justify-between pb-6 border-b border-b-gray-400 md:flex-row gap-2 mt-6"
      >
        <Input 
          placeholder="Pesquisar pelo nome"
          onChange={(e) => {setName(e.target.value)}}
        />

        <Button type="submit" variant="icon">
          <img src={searchSvg} alt="icone de pesquisar" className="h-5" />
        </Button>

      </form>

      <div className="my-6 flex flex-col gap-4 max-h-[342px] overflow-y-scroll">
        {
          refunds.map((item) => (
            <RefundItem key={item.id} data={item} href={`/refund/${item.id}`}/>))
        }
        


      </div>

      <Pagination 
        current={page} 
        total={totalOfPage} 
        onNext={() => handlePagination("next")} 
        onPrevious={() => handlePagination("previous")}
      />

    </div>


  )

}