import React, { useRef } from "react";
import Draggable from "react-draggable";

const DraggableWrapper = ({ children }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      {React.cloneElement(children, { ref: nodeRef })}
    </Draggable>
  );
};

export default DraggableWrapper;
