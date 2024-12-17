import { createContext ,useEffect,useState} from 'react';
import { toast } from "react-toastify";
export const KanbanContext = createContext()

export const KanbanProvider =({children})=>{


  const data = [
    {
      id: "Column1",
      title: "Todo",
      cards: [
        {
          id: "Card1",
          title: "Card1",
           description:'data not found',
        },
        {
          id: "Card2",
          title: "Card2",
           description:'data not found'
        },
        {
          id: "Card3",
          title: "Card3",
          description:'data found'
        },
        {
          id: "Card4",
          title: "Card4",
          description:'data not found'
        },
        {
          id: "Card5",
          title: "Card5",
          description:'data found'
        }
      ]
    },
    {
      id: "Column2",
      title: "In progress",
      cards: [
       
        
      ]
    },
    {
      id: "Column3",
      title: "Done",
      cards: [
       
      ]
    }
  ];

  const [columns, setColumns] = useState(() => {
    const savedData = localStorage.getItem("columns");
    const parsedData = savedData ? JSON.parse(savedData) : null;
    const isValidData =
      parsedData &&
      parsedData.some((column) => column.cards && column.cards.length > 0);
  
    return isValidData ? parsedData : data;
  });

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  const addCard = (columnId, cardTitle, cardDescription) => {
    const newCard = {
      id: `Card${Date.now()}`, 
      title: cardTitle,
      description: cardDescription
    };

    const updatedColumns = [...columns];
    const columnIndex = updatedColumns.findIndex((column) => column.id === columnId);
    if (columnIndex >= 0) {
      updatedColumns[columnIndex].cards.push(newCard);
      setColumns(updatedColumns);
      
    }
    toast.success("Card Add succefully");
  };

  const deleteCard = (columnId, cardId) => {
    console.log(columnId, cardId)
    const updatedColumns = [...columns];
    const columnIndex = updatedColumns.findIndex((column) => column.id === columnId);
    if (columnIndex >= 0) {
      updatedColumns[columnIndex].cards = updatedColumns[columnIndex].cards.filter(card => card.id !== cardId);
      setColumns(updatedColumns);
    }
    toast.success("Delete succefully");
  };


const value ={
    data,
    columns,
    setColumns,
    addCard,
    deleteCard
}




    return(
        <>
        <KanbanContext.Provider value={value}>
        {children}
        </KanbanContext.Provider>
        </>
    )
}