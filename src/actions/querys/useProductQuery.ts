import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../../interfaces/IProduct";

const useProductQuery = (id: string) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: async (): Promise<IProduct> => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACK_URL}/products/${id}`
      );
      return data;
    },
    staleTime: 1000 * 60 * 3,
  });

export default useProductQuery;
