import { IProduct } from "./IProduct"

interface ICartReducerAction{
  type:'addProduct' | 'removeProduct' | 'resetCart',
  payload?:{product:IProduct}
}

export type {ICartReducerAction}