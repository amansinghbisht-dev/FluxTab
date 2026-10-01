import React, { useRef } from "react";
import Draggable from "react-draggable";

const DraggableWrapper = ({ children, defaultPosition, onStop }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      cancel=".react-resizable-handle, .no-drag"
      defaultPosition={defaultPosition}
      onStop= {onStop}
    >
      {React.cloneElement(children, { ref: nodeRef })}
    </Draggable>
  );
};

export default DraggableWrapper;
