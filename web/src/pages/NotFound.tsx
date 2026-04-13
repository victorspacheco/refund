export function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-100">OOOOOOPS!</h1>
        <p className="text-lg text-gray-200 font-medium">Essa página não existe</p>
        <a href="/" className="text-sm text-green-100 font-semibold mt-10 hover:text-green-200 transition ease-out">Voltar para a Home</a>

      </div>
    </div>
  )
}