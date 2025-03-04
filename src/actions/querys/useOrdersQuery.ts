import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IOrder } from "../../interfaces/IOrder";

const useOrdersQuery = (authToken: string) =>
  useQuery({
    queryKey: ["orders", authToken],
    queryFn: async (): Promise<IOrder[] | never[]> => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACK_URL}/orders`,
        { headers: { Authorization: "Bearer " + authToken } }
      );
      return data;
    },
    staleTime: 1000 * 60,
  });

export default useOrdersQuery;
