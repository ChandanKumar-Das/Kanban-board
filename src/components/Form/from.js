import { KanbanContext } from "../../context/kanbanContext";
import { useContext, useState } from "react";


const isTitleDuplicate = (columns, title) => {
  return columns.some((column) =>
    column.cards.some((card) =>
      card.title.toLowerCase().includes(title.toLowerCase())
    )
  );
};

export const From = ({ props }) => {
  const { setFrom } = props;
  const [newCard, setNewCard] = useState({ title: "", description: "" });
  const [selectedColumn, setSelectedColumn] = useState("Column1");
  const [errors, setErrors] = useState({ title: "", description: "" });


  const { addCard, columns } = useContext(KanbanContext); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    //console.log(  name, value )
    setNewCard({ ...newCard, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleAddCard = (e) => {
    e.preventDefault(); 

    let tempErrors = {};

    if (!newCard.title) {
      tempErrors.title = "Title is required.";
    }else if (isTitleDuplicate(columns, newCard.title)) {
      tempErrors.title = "A card with this title already exists.";
    }

    if (!newCard.description) {
      tempErrors.description = "Description is required.";
    } 

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }
    addCard(selectedColumn, newCard.title, newCard.description);
    setNewCard({ title: "", description: "" });
    setFrom(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500/75 z-50 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl mb-4">Add New Task</h2>

          <form onSubmit={handleAddCard}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Add Title</label>
              <input
                type="text"
                className={`border px-4 py-2 w-full rounded ${
                  errors.title ? "border-red-500" : ""
                }`}
                name="title"
                placeholder="Enter title"
                value={newCard.title}
                onChange={handleInputChange}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Add Description
              </label>
              <input
                type="text"
                className={`border px-4 py-2 w-full rounded ${
                  errors.description ? "border-red-500" : ""
                }`}
                placeholder="Enter description"
                name="description"
                value={newCard.description}
                onChange={handleInputChange}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setFrom(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
