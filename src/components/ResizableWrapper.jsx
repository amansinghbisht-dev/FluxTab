import { forwardRef } from "react";
import { ResizableBox } from "react-resizable";

// 1. Add ...props to catch the hidden drag events and styles
const ResizableWrapper = forwardRef(({ children, className, ...props }, ref) => {
  return (
    // 2. Spread {...props} onto the div so react-draggable can attach its listeners
    <div ref={ref} className="w-fit h-fit absolute" {...props}>
      <ResizableBox
        width={200}
        height={150}
        minConstraints={[100, 100]}
        maxConstraints={[500, 400]}
        className={className}
      >
        {children}
      </ResizableBox>
    </div>
  );
});

export default ResizableWrapper;