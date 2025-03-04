import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../../interfaces/IProduct";

const useProductsQuery = (search:string) => useQuery({
  queryKey: ["products",search],
  queryFn: async ():Promise<IProduct[] | never[]> => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_BACK_URL}/products`,{params:{search:search}}
    )
    return data;
  },
  staleTime: 1000 * 60 * 3,
})

export default useProductsQuery;