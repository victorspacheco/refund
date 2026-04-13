import foodSvg from "../assets/food.svg"
import otherSvg from "../assets/others.svg"
import servicesSvg from "../assets/services.svg"
import transportSvg from "../assets/transport.svg"
import accommodationsSvg from "../assets/accommodation.svg"


export const CATEGORIES = {
  food: {
    name: "Alimentação",
    icon: foodSvg
  },
  others: {
    name: "Outros",
    icon: otherSvg
  },
  services: {
    name: "Serviço",
    icon: servicesSvg
  },
  transport: {
    name: "Transporte",
    icon: transportSvg
  },
  accommodation: {
    name: "Hospedagem",
    icon: accommodationsSvg
  }
}


export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>