import { Pizza } from "./pizza";

export type Order = {
  id: number;
  userId: number;
  goods: Pizza[];
}
