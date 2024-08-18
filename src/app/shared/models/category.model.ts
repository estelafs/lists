/** Model for Category object. */
export interface Category {
  id: number;
  name: string;
  description?: string;
  color: CategoryColor;
}

/** Enum for available category colors */
export enum CategoryColor {
  Orange = '#FF5733', 
  Pink = '#CB46B3', 
  Red = '#FF0000',
  Gray = '#808080',
}
