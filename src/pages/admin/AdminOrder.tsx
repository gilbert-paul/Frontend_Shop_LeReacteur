import { useState } from "react";
import { Input } from "../../components/Input";
import { useAuthContext } from "../../contexts/Auth/useAuthContext";
import { IOrder } from "../../interfaces/IOrder";
import { Draggable } from "@hello-pangea/dnd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../../query/queryClient";

const AdminOrder = ({ order, index }: { order: IOrder; index: number }) => {
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
      const response: { message: string } = await axios.put(
        `${import.meta.env.VITE_APP_BACK_URL}/orders/mark-delivered/${id}`,
        {},
        { headers: { Authorization: "Bearer " + authToken } }
      );
      setMessage(response.message);
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
    }
  };

  return (
    <Draggable draggableId={order._id} index={index}>
      {(provided) => {
        return (
          <div
            className="bg-white p-2"
            key={order._id}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="flex gap-2">
              <span className="text-secondary font-bold">Owner:</span>
              <span className="italic">
                {typeof order.owner.username === "string" &&
                  order.owner.username}
              </span>
            </div>
            <div className="flex flex-col gap-2 p-1 text-sm">
              {order.products.map((product) => {
                return (
                  <div
                    className="border border-primary p-1"
                    key={product.product._id}
                  >
                    <div className="flex gap-2">
                      <span className="text-secondary font-bold">Title:</span>
                      <span className="italic">{product.product.title}</span>
                    </div>
                    <div>
                      <span className="text-secondary font-bold">
                        Quantity:
                      </span>
                      <span className="italic">{product.quantity}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="delivered" className="text-secondary font-bold">
                Delivered:
              </label>
              <Input
                onChange={() => toggleDelivery(order._id)}
                type="checkbox"
                disabled={order.delivered}
                checked={order.delivered}
                name="delivered"
              />
              {order.delivered && (
                <span className="text-sm italic">Already delivered</span>
              )}
            </div>
            {message && message}
          </div>
        );
      }}
    </Draggable>
  );
};

export { AdminOrder };
