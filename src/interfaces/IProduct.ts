import { IReview } from "./IReview";

interface IProduct {
  title:string;
  description:string;
  category:string;
  price:number;
  discountPercentage:number;
  rating:number;
  stock:number;
  tags:string[];
  brand:string;
  sky:string;
  weight:number;
  dimensions:{width:number, height:number, depth:number}
  warrantyInformation:string;
  shippingInformation:string;
  availabilityStatus:string;
  reviews:IReview[];
  returnPolicy:string;
  minimumOrderQuantity:number;
  images:string[];
  thumbnail:string;
  _id:string;
}

export type {IProduct}