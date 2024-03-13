import '../css/UndoButton.css';

export const UndoButton = () => {
  const handleUndo = () => {

    console.log("Undo button clicked ");
  };

  return (
    <div>
      <button className='undo-btn' onClick={handleUndo}></button>
    </div>
  );
};


