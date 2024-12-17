import {  useDroppable } from "@dnd-kit/core";
import { Cards } from "../cards/card";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";



export function Column({ id, title, cards }) {
    const { setNodeRef } = useDroppable({ id: id });
   

    
    return (
        <>
        <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
            <div  ref={setNodeRef} className=''>
                <h1 className="text-center font-bold">{title}</h1>

                {cards.map((card) => (
                        <Cards Columnid={id} key={card?.id} id={card?.id} props={card} />
                    ))}
            </div>
            </SortableContext>

           
        </>
    )
}