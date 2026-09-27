import DefaultSearchbar from "./assets/Searchbar/default";
import DraggableWrapper from "./components/DraggableWrapper";
import ResizableWrapper from "./components/ResizableWrapper";

const App = () => {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">
      <DraggableWrapper defaultPosition={{ x: 50, y: 50 }}>
        <ResizableWrapper className="flex items-center justify-center">
          <div className="p-5 hidden w-full h-full bg-purple-800 text-white font-extrabold items-center justify-center">
            Drag and Resize me!!
          </div>
        </ResizableWrapper>
      </DraggableWrapper>

      <ResizableWrapper
        className=" hidden items-center justify-center"
        style={{ top: "250px", left: "50px" }}
      >
        <div className="p-5 w-full h-full bg-red-800 text-white font-extrabold flex items-center justify-center">
          Resize me!!
        </div>
      </ResizableWrapper>

      <DraggableWrapper defaultPosition={{ x: 500, y: 500 }}>
        <DefaultSearchbar className="max-w-4xl shadow-red-500/50" />
      </DraggableWrapper>
    </div>
  );
};

export default App;
