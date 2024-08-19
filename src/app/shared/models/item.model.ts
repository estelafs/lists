import { Category } from './category.model';
import { List } from './list.model';

/** Model for Item object. */
export interface Item {
  id?: number;
  name: string;
  checked: boolean;
  note?: string;
  quantity?: number;
  unit?: MeasuringUnits;
  list?: List;
  category?: Category;
}

/** Enum for measuring units */
export enum MeasuringUnits {
  kilo, 
  liter, 
  centimeter, 
  meter, 
}
