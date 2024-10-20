import { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

export default function ProjectsPopup({ onClose, zIndex, bringToFront, position, size, updatePosition, updateSize }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Fetch projects from projects.json
    fetch('/projects.json')
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

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
          {/* Header and Toolbar remain unchanged */}
          <div className="popup-header flex items-center justify-between p-2 bg-gradient-to-b from-gray-200 to-gray-300 border-b border-gray-400">
            <div className="flex space-x-2">
              <button className="w-3 h-3 bg-red-500 rounded-full" onClick={onClose} />
              <button className="w-3 h-3 bg-yellow-500 rounded-full" />
              <button className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="text-center text-sm font-semibold">Projects</div>
            <div className="w-16"></div>
          </div>

          <div className="flex items-center space-x-2 p-2 bg-gray-100 border-b border-gray-300">
            {['⬅️', '➡️', '🔄', '🏠', '➕'].map((icon, index) => (
              <button key={index} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded">
                {icon}
              </button>
            ))}
            <input 
              type="text" 
              className="flex-grow h-8 px-2 border border-gray-300 rounded bg-gray-50 text-gray-500" 
              value="portfolio/projects.html" 
              readOnly
            />
          </div>

          {/* Projects Content */}
          <div className="p-4 overflow-auto" style={{ height: size.height - 90 }} onMouseDown={bringToFront}>
            {selectedProject ? (
              <div className="space-y-4">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="mb-4 px-2 py-1 bg-gray-200 rounded"
                >
                  Back to Projects
                </button>
                <div className="flex space-x-4 mb-4">
                  {selectedProject.video && (
                    <video 
                      src={selectedProject.video} 
                      controls 
                      className="w-1/2 h-auto rounded-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <Image 
                    src={selectedProject.img} 
                    alt={selectedProject.name} 
                    width={300}
                    height={200}
                    className="w-1/2 h-auto object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold">{selectedProject.name}</h2>
                <p className="text-gray-600">{selectedProject.desc}</p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Project Details</h3>
                  <p className="whitespace-pre-wrap">{selectedProject.details}</p>
                </div>
                <a 
                  href={selectedProject.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Source Code
                </a>
              </div>
            ) : (
              <div className="flex flex-wrap -mx-2">
                {projects.map((project, index) => (
                  <div 
                    key={index} 
                    className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col">
                      <Image src={project.img} alt={project.name} width={300} height={160} className="w-full h-40 object-cover rounded-lg mb-2" />
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-gray-600 mb-1 flex-grow">{project.desc}</p>
                      <p className="text-xs text-gray-500">Built at: {project.builtAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Resizable>
    </Draggable>
  );
}