import React, { useRef } from "react";
import Draggable from "react-draggable";

const DraggableWrapper = ({ children, defaultPosition}) => {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      cancel=".react-resizable-handle"
      defaultPosition={defaultPosition}
    >
      {React.cloneElement(children, { ref: nodeRef })}
    </Draggable>
  );
};

export default DraggableWrapper;
