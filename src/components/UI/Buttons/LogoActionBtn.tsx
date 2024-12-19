type LogoActionBtnProps = {
  tooltip: string
  icon: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const LogoActionBtn: React.FC<LogoActionBtnProps> = ({ tooltip, icon, onClick }) => {
  return (
    <button
      data-tip={tooltip}
      className="
        btn btn-sm bg-gray-100 py-1.5
        hover:bg-gray-200 flex items-center gap-2 opacity-0
        group-hover:opacity-100 transition-opacity duration-300
      "
      onClick={onClick}
    >
      {icon}
    </button>
  )
}

export default LogoActionBtn
