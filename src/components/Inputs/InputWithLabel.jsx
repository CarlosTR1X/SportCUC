
const InputWithLabel = ({ label, onChange, name, type, className, autoComplete, value }) => {
    return <div className={`${className} border border-rounded bg-white flex flex-col rounded-lg px-3 py-2 font-medium`}>
        <label htmlFor={name} className="text-baseGray text-sm">{label}</label>
        <input
            autoComplete={autoComplete}
            id={name}
            itemID={name}
            value={`${value}`}
            name={`${name}`}
            className="focus-within:outline-none"
            type={type ?? "text"}
            onChange={onChange}
        />
    </div>
}

export default InputWithLabel