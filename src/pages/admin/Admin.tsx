import { useAuthContext } from "../../contexts/Auth/useAuthContext";
import { Loader } from "../../components/Loader";
import { AdminOrder } from "./AdminOrder";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import useOrdersQuery from "../../actions/querys/useOrdersQuery";
import { startTransition, useOptimistic } from "react";
import { IOrder } from "../../interfaces/IOrder";

const Admin = () => {
  const { auth } = useAuthContext();
  const { data, isLoading, error } = useOrdersQuery(auth?.token || "");

  const [optimisticOrder, addOptimisticOrder] = useOptimistic(
    data || [],
    (state, newData: IOrder[] | never[]) => {
      void state;
      return newData;
    }
  );

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }
    if (optimisticOrder) {
      const updatedOrders = optimisticOrder;
      const [removedOrder] = updatedOrders.splice(source.index, 1);
      updatedOrders.splice(destination.index, 0, removedOrder);
      startTransition(() => {
        addOptimisticOrder(updatedOrders);
      });
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
      <div className="flex flex-col gap-4">
        <div className="text-secondary text-xl">Admin panel:</div>
        {optimisticOrder.length === 0 && (
          <div className="italic">There is not product in your cart...</div>
        )}
        <Droppable droppableId="1">
          {(provided) => {
            return (
              <div
                className="flex flex-col gap-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {optimisticOrder &&
                  optimisticOrder.map((order, index) => {
                    return (
                      <AdminOrder
                        key={order._id}
                        order={order}
                        index={index}
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
