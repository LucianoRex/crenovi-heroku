export interface IDynamicTableBuilder {
  name: string;
  label: string;
  type?: FieldType;
  complemento?: string;
}
export enum FieldType {
  date = 'date',
  boolean = 'boolean',
  phone = 'phone',
}
