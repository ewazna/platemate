import { Rate } from "./RateEnum";

export interface Comment {
  userId: string;
  text: string;
  rate: Rate;
}
