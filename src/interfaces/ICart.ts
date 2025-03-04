import { Dispatch } from "react";
import { IProduct } from "./IProduct";
import { ICartReducerAction } from "./ICartReducerAction";

interface ICartProduct {
  product: IProduct;
  quantity: number;
}

interface ICartContext {
  cartDispatch:Dispatch<ICartReducerAction>,
  cartState:{products:ICartProduct[],total:number}
}

export type { ICartProduct, ICartContext };
