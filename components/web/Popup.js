import { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import resizable styles

export default function Popup({ title, content, onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Handle minimize, maximize, and close actions
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    onClose();
  };

  // Class for toggling maximize
  const containerClass = isMaximized ? 'w-screen h-screen' : 'w-[400px] h-[300px]';

  return (
    <Draggable handle=".popup-header">
      <ResizableBox
        width={400}
        height={300}
        minConstraints={[300, 200]}
        maxConstraints={isMaximized ? [window.innerWidth, window.innerHeight] : [600, 500]}
        className={`relative border border-gray-300 rounded-lg shadow-lg bg-white ${isMinimized ? 'hidden' : ''}`}
        style={{ zIndex: 10 }}
      >
        {/* Popup Header with the three circles */}
        <div className="popup-header flex justify-between items-center p-2 bg-gray-200 rounded-t-lg cursor-move">
          <div className="flex space-x-2">
            <button
              className="w-3 h-3 bg-red-500 rounded-full"
              onClick={handleClose}
              title="Close"
            />
            <button
              className="w-3 h-3 bg-yellow-500 rounded-full"
              onClick={handleMinimize}
              title="Minimize"
            />
            <button
              className="w-3 h-3 bg-green-500 rounded-full"
              onClick={handleMaximize}
              title="Maximize"
            />
          </div>
          <span className="text-sm font-semibold">{title}</span>
        </div>

        {/* Popup Content */}
        <div className={`p-4 ${containerClass}`}>
          {content}
        </div>
      </ResizableBox>
    </Draggable>
  );
}