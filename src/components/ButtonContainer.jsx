import Button from "./Button";
const ButtonContainer = ({buttonValues, handleClick}) => {
  return (
    <div className="boardContainer">
      {
        buttonValues.map((obj) => <Button key={obj.id} value={obj.value} id={obj.id} handleClick={handleClick}/>)
      }
    </div>
  );
};

export default ButtonContainer;