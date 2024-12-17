import { useSortable } from "@dnd-kit/sortable";
import { KanbanContext } from "../../context/kanbanContext";
import { useContext, useState } from "react";
import { CSS } from "@dnd-kit/utilities";

export function Cards({ id, props, Columnid }) {
  const { deleteCard } = useContext(KanbanContext);
  const [showModal, setShowModal] = useState(false); 

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: id });

  const style = {
    margin: "10px",
    padding: "10px",
    background: "white",
    color: "#333",
    opacity: isDragging ? 0.5 : 1,
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition: "transform 200ms ease, opacity 200ms ease",
    boxShadow: isDragging
      ? "0 4px 8px rgba(0,0,0,0.2)"
      : "0 2px 4px rgba(0,0,0,0.1)",
    cursor: "grab",
    zIndex: isDragging ? 999 : "auto",
  };

  const handleDelete = () => {
    deleteCard(Columnid, props.id); 
    setShowModal(false); 
  };

  return (
    <>
     
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="bg-white m-4 p-2 shadow-md border"
      >
        <h1 className="text-xs">Title: {props.title}</h1>
        <h1 className="text-xs">Description: {props.description}</h1>
        <div className="w-full text-right">
          <button
            onClick={() => setShowModal(true)} 
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this card?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)} 
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
