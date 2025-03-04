interface IReview {
  rating:number;
  comment:string;
  date:Date;
  reviewerName:string;
  reviewerEmail:string;
  _id:string;
}

export type {IReview}