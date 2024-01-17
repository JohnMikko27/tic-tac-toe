import Button from "./Button";
const ButtonContainer = ({buttonValues}) => {
  // maybe pass an array with all of the buttons values and IDs (so that I can map through it)
  return (
    <div className="boardContainer">
      {
        buttonValues.map((obj) => <Button key={obj.id} value={obj.value}/>)
      }
    </div>
  );
};

export default ButtonContainer;