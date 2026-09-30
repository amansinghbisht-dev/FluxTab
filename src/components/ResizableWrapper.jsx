import { forwardRef } from "react";
import { ResizableBox } from "react-resizable";

const ResizableWrapper = forwardRef(
  (
    { children, className, width, height, minConstraints, onResize, ...props },
    ref,
  ) => {
    return (
      <div ref={ref} className="w-fit h-fit absolute" {...props}>
        <ResizableBox
          width={width || 200}
          height={height || 150}
          minConstraints={minConstraints || [150, 100]}
          onResize={onResize}
          className={className}
        >
          {children}
        </ResizableBox>
      </div>
    );
  },
);

export default ResizableWrapper;
