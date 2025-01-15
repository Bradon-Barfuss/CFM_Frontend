import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FiTrash2, FiPlus } from "react-icons/fi";
import ContextBackground from "./components/ContextBackground";
import VerseComponent from "./components/VerseComponent";
import axios from "axios";

const App = () => {
  // State to hold the list of components
  const [components, setComponents] = useState([]);

  // Fetch initial state from the backend on component mount
  useEffect(() => {
    fetchStateFromBackend();
  }, []);

  // Function to fetch state from backend
  const fetchStateFromBackend = async () => {
    try {
      const response = await axios.get("https://cfm-backend-238390561596.us-central1.run.app/components");
      const fetchedComponents = response.data.map((item) => ({
        id: item.id,
        type: item.type,
        content: item.content,
      }));
      setComponents(fetchedComponents);
    } catch (error) {
      console.error("Error fetching components:", error);
    }
  };

  // Function to handle drag-and-drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside a valid area
    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setComponents(items);
  };

  // Function to add a new component
  const addComponent = (type) => {
    const id = Date.now().toString(); // Generate unique ID
    const newComponent = { id, type, content: "" };
    setComponents([...components, newComponent]);
  };

  // Function to update the content of a component
  const updateContent = (id, content) => {
    setComponents(
      components.map((item) =>
        item.id === id ? { ...item, content } : item
      )
    );
  };

  // Function to save the current state to the backend
  const saveStateToBackend = async () => {
    try {
      await axios.post(
        "https://cfm-backend-238390561596.us-central1.run.app/components/",
        
        components.map((item) => ({
          id: item.id,
          type: item.type,
          content: item.content,
        }))
      );
      alert("Components saved successfully!");
    } catch (error) {
      console.error("Error saving components:", error);
    }
  };

  // Function to delete a component
  const deleteComponent = async (id) => {
    try {
      await axios.delete(`https://cfm-backend-238390561596.us-central1.run.app/components/${id}`);
      fetchStateFromBackend(); // Refresh the state after deletion
    } catch (error) {
      console.error("Error deleting component:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Youth Lesson Planner</h1>

        {/* Save State Button */}
        <button
          onClick={saveStateToBackend}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4"
        >
          Save State
        </button>

        {/* Add Component Buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => addComponent("context")}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FiPlus className="mr-2" /> Add Context
          </button>
          <button
            onClick={() => addComponent("verse")}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FiPlus className="mr-2" /> Add Verse
          </button>
        </div>

        {/* Drag-and-Drop Components */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppableID">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {components.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mb-4 relative bg-white shadow-md rounded-md p-4 border border-gray-200"
                      >
                        {/* Render Component Based on Type */}
                        {item.type === "context" ? (
                          <ContextBackground
                            content={item.content}
                            onContentChange={(content) =>
                              updateContent(item.id, content)
                            }
                          />
                        ) : (
                          <VerseComponent
                            content={item.content}
                            onContentChange={(content) =>
                              updateContent(item.id, content)
                            }
                          />
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => deleteComponent(item.id)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
