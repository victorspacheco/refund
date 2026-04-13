import uploadSvg from "../assets/upload.svg"

type Props = React.ComponentProps<"input"> & {
  filename: string | null
}


export function Upload({filename, ...rest} : Props) {
  return (
    <div>
      <legend className="uppercase text-xxs mb-2 text-gray-200">Comprovante</legend>

      <div className="w-full h-12 flex items-center rounded-lg border border-gray-300 text-sm text-gray-100 bg-transparent outline-none">

        <input type="file" id="upload" className="hidden" {...rest}/>

        <span className="text-xs text-gray-100 flex-1 pl-4">{filename ?? "Selecione arquivo"}</span>

        <label htmlFor="upload" className="flex h-12 px-4 items-center bg-green-100 rounded-lg cursor-pointer hover:bg-green-200 transition ease-linear disabled:opacity-50">
          <img src={uploadSvg} alt=" ícone de upload" className="h-6 w-6"/>
        </label>

      </div>
    </div>
  )
}