import { Category } from './category.model';
import { List } from './list.model';

/** Model for Item object. */
export interface Item {
  id: number;
  name: string;
  checked: boolean;
  note?: string;
  quantity?: number;
  unit?: string;
  list?: List;
  category?: Category;
}

/** Enum for measuring units */
export enum MeasuringUnits {
  kilo = 'k',
  liter = 'l',
  centimeter = 'cm',
  meter = 'm',
}
