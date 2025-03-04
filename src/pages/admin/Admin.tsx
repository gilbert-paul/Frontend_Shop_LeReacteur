import { useAuthContext } from "../../contexts/Auth/useAuthContext";
import { Loader } from "../../components/Loader";
import { AdminOrder } from "./AdminOrder";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import useOrdersQuery from "../../actions/querys/useOrdersQuery";
import { useState } from "react";

const Admin = () => {
  
  const { auth } = useAuthContext();
  const { data, isLoading, error } = useOrdersQuery(auth?.token || '');

  const [reloadOrder, setReloadOrder]=useState(false)
  void reloadOrder
  
  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }
    if(data){
      const removedOrder = data.splice(source.index, 1);
      data.splice(destination.index, 0, ...removedOrder);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div>Admin :</div>
        <Droppable droppableId="1">
          {(provided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {data && data.map((order, index) => {
                  return (
                    <AdminOrder
                      key={order._id}
                      order={order}
                      index={index}
                      setReloadOrder={setReloadOrder}
                    ></AdminOrder>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export { Admin };
