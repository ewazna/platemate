import { Unit } from "./UnitEnum";

export interface Ingredient {
  id: string;
  title: string;
  quantity: number;
  unit: Unit;
}
