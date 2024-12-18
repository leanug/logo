'use client'

import { FaArrowLeft } from "react-icons/fa"
import { useRouter } from "next/navigation"

type GoBackBtnProps = {
  defaultRoute?: string;
}


const GoBackBtn: React.FC<GoBackBtnProps> = ({defaultRoute = '/'}) => {
  const router = useRouter()

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back() // Go back if there's history
    } else {
      router.push(defaultRoute) // Redirect to default route as fallback
    }
  }

  return (
    <button
      className="btn"
      onClick={handleGoBack}
    >
      <FaArrowLeft size={22} />
    </button>
  )
}

export default GoBackBtn