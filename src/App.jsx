import DraggableWrapper from "./components/DraggableWrapper";

const App = () => {
  return (
    <div className="h-screen w-screen bg-black">
      <DraggableWrapper>
        <div className="bg-amber-50 w-40 text-center p-5"> Drag meee!! </div>
      </DraggableWrapper>
    </div>
  );
};

export default App;
