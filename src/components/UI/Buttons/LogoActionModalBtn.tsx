type LogoActionModalBtnProps = {
  tooltip: string
  icon: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const LogoActionModalBtn: React.FC<LogoActionModalBtnProps> = ({ tooltip, icon, onClick }) => {
  return (
    <button
      data-tip={tooltip}
      className="
        btn btn-sm bg-gray-100 py-1.5
        hover:bg-gray-200 flex items-center
      "
      onClick={onClick}
    >
      {icon}
    </button>
  )
}

export default LogoActionModalBtn
