import "../styles/Button.css";
const Button = ({value, id, handleClick}) => {
  return (
    <button onClick={handleClick} id={id} className="button">{value}</button>
  );
};

export default Button;