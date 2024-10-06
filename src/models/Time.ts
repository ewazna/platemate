import { TimeUnit } from "./TimeUnitEnum";

export interface Time {
  id?: string;
  quantity: number;
  unit: TimeUnit;
}
