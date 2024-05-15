

const Button = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={`${className} px-5 py-3 rounded-lg font-medium`}>
      {children}
    </button>)
}

export default Button



