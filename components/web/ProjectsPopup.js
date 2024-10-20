import { useCallback } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

export default function ProjectsPopup({ onClose, zIndex, bringToFront, position, size, updatePosition, updateSize }) {
  const handleDrag = useCallback((e, ui) => {
    updatePosition({ x: ui.x, y: ui.y });
  }, [updatePosition]);

  const handleResize = useCallback((e, { size: newSize, handle }) => {
    const deltaX = newSize.width - size.width;
    const deltaY = newSize.height - size.height;
    
    updateSize(newSize);
    
    if (handle.includes('w')) {
      updatePosition({ x: position.x - deltaX, y: position.y });
    }
    if (handle.includes('n')) {
      updatePosition({ x: position.x, y: position.y - deltaY });
    }
  }, [size, position, updatePosition, updateSize]);

  return (
    <Draggable
    handle=".popup-header"
    onStart={bringToFront}
    position={position}
    onDrag={handleDrag}
  >
    <Resizable
      width={size.width}
      height={size.height}
      onResize={handleResize}
      minConstraints={[300, 200]}
      maxConstraints={[window.innerWidth * 0.8, window.innerHeight * 0.8]}
      className="absolute border border-gray-300 rounded-lg shadow-lg bg-white"
      style={{ zIndex, position: 'absolute' }} 
    >
        <div style={{ width: size.width, height: size.height }}>
        <div className="popup-header flex items-center justify-between p-2 bg-gradient-to-b from-gray-200 to-gray-300 border-b border-gray-400">
            <div className="flex space-x-2">
              <button className="w-3 h-3 bg-red-500 rounded-full" onClick={onClose} />
              <button className="w-3 h-3 bg-yellow-500 rounded-full" />
              <button className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="text-center text-sm font-semibold">Projects</div>
            <div className="w-16"></div> {/* Placeholder for balance */}
          </div>

          {/* Toolbar */}
          <div className="flex items-center space-x-2 p-2 bg-gray-100 border-b border-gray-300">
            {['⬅️', '➡️', '🔄', '🏠', '➕'].map((icon, index) => (
              <button key={index} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded">
                {icon}
              </button>
            ))}
            <input type="text" className="flex-grow h-8 px-2 border border-gray-300 rounded" placeholder="Search or enter website name" />
          </div>
          <div className="p-4 overflow-auto" style={{ height: size.height - 40 }} onMouseDown={bringToFront}>
            <p>This is the "Projects" section showcasing some of the projects...</p>
          </div>
        </div>
      </Resizable>
    </Draggable>
  );
}
