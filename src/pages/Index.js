
import {useContext, useState} from 'react'
import { From } from "../components/Form/from"
import { KanbanContext } from "../context/kanbanContext"
import { Column } from '../components/columns/Column'
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
export const Index =()=>{
     
   const [openFrom,setFrom] = useState(false)

   const {columns,setColumns} = useContext(KanbanContext)


   const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  // console.log('columns:-',columns)



  const handleDragEnd = ({ active, over }) => {
  
    if (!over) return; 
    const activeId = active.id; 
    const overId = over.id; 
    // console.log(activeId)
    // console.log(overId)
 
    if (activeId === overId) return
    let updatedColumns = [...columns];
    const sourceColumn = updatedColumns.find(column =>
      column.cards.some(card => card.id === activeId)
    );
    const targetColumn = updatedColumns.find(column => column.id === overId || 
      column.cards.some(card => card.id === overId));
    if (!sourceColumn || !targetColumn) return;
    const card = sourceColumn.cards.find(card => card.id === activeId);
    sourceColumn.cards = sourceColumn.cards.filter(card => card.id !== activeId);
    if (sourceColumn === targetColumn) {
      const targetIndex = targetColumn.cards.findIndex(card => card.id === overId);
      targetColumn.cards.splice(targetIndex, 0, card);
    } else {
      const targetIndex = overId.startsWith("Card")
        ? targetColumn.cards.findIndex(card => card.id === overId)
        : targetColumn.cards.length;
      targetColumn.cards.splice(targetIndex, 0, card);
    }
    setColumns(updatedColumns);
  };
  

//   const handleDragOver = (event) => {
//     event.preventDefault(); 
//   };
  

    return(
        <>
        <div className="max-w-[1000px] mx-auto">
            <div className=' text-2xl font-bold flex justify-center items-center'>Kanban board</div>
            <div className='text-right'>
               <button onClick={()=>setFrom(true)} className='p-4 text-green-500'>+ Add Todos</button> 
            </div>
            <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    //   onDragOver={handleDragOver}
    >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-4">
   
    
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
          ></Column>
        ))}
      
 
            
            </div>
            </DndContext>
        </div>
        {openFrom && <From props={{setFrom}}/>}
        </>
    )
}