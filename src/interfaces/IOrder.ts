import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

interface IOrder {
  _id: string;
  owner: IUser;
  products: { product: IProduct; quantity: number }[];
  price: number;
  delivered: boolean;
}

export type { IOrder };
