import { classMerge } from "../utils/classMerge"


type Props = React.ComponentProps<"button"> & {
  isloading?: boolean
  variant?: "base" | "icon" | "iconSmall"
}

const variants = {
  button: {
    base: "h-12",
    icon: "h-12 w-12",
    iconSmall: "h-8 w-8"
  }
}


export function Button({
  children, 
  isloading, 
  type="button", 
  variant="base",
  ...rest
}: Props) {
  return (
    <button 
      type={type} 
      disabled={isloading}
      className={classMerge([
        
        "flex items-center justify-center bg-green-100 rounded-lg text-white cursor-pointer hover:bg-green-200 transition ease-linear disabled:opacity-50",
        isloading && "cursor-progress",
        variants.button[variant],
      ])}
      {...rest}
    >
      {children}
    </button>

  )
}