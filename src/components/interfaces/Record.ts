export interface DataType<T extends string | number | Date> {
  id: string;
  description: string;
  defaultData: T;
}

export type DataTable<T extends string | number | Date> = Map<DataType<T>, T>;
