const Input = ({ id, type, label, disabled  , value , setvalue}) => (
    <input className="form-group__input" value={value} onChange={(e)=>setvalue(e.target.value)} type={type} id={id} placeholder={label} disabled={disabled}/>
);

export default Input;