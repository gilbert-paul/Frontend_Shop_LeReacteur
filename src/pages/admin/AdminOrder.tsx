import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../../components/Input";
import { useAuthContext } from "../../contexts/Auth/useAuthContext";
import { IOrder } from "../../interfaces/IOrder";
import { Draggable } from "@hello-pangea/dnd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../../query/queryClient";

const AdminOrder = ({ order, index,setReloadOrder }: { order: IOrder; index: number,setReloadOrder:Dispatch<SetStateAction<boolean>> }) => {
  const { auth } = useAuthContext();
  const [message, setMessage] = useState<string | null>(null);


const toggleDeliveryOrderMutation = useMutation<
    void,
    Error,
    {
      id: string;
      authToken: string;
    }
  >({
    mutationFn: async ({ id, authToken }) => {
      const response:{message:string} = await axios.put(
        `${import.meta.env.VITE_APP_BACK_URL}/orders/mark-delivered/${id}`,
        {},
        { headers: { Authorization: "Bearer " + authToken } }
      );
      setMessage(response.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const toggleDelivery = async (orderId: string) => {
    if (auth) {
      toggleDeliveryOrderMutation.mutate({
        id: orderId,
        authToken: auth.token,
      });
      setReloadOrder(prev=>!prev)
    }
  };

  return (
    <Draggable draggableId={order._id} index={index}>
      {(provided) => {
        return (
          <div className='bg-white' key={order._id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <div>
              Owner:
              {typeof order.owner.username === "string" && order.owner.username}
            </div>
            <div>
              {order.products.map((product) => {
                return (
                  <div key={product.product._id}>
                    <div>{product.product.title}</div>
                    <div>Quantity: {product.quantity}</div>
                  </div>
                );
              })}
            </div>
            <label htmlFor="delivered">Delivered:</label>
            <Input
              onChange={() => toggleDelivery(order._id)}
              type="checkbox"
              disabled={order.delivered}
              checked={order.delivered}
              name="delivered"
            />
            {message && message}
          </div>
        );
      }}
    </Draggable>
  );
};

export { AdminOrder };
