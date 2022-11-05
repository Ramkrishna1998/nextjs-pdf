import { ALL_COLUMNS } from './sheet';

export interface IAddress {
  village?: string;
  email?: string;
  residentialAddress?: string;
  officeAddress?: string;
}
export interface ICommonForm {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  maritialStatus?: string;
  education?: string;
  marriageDate?: string;
  contactNumber?: string;
  profilePic?: string;
}
export interface IMainForm extends ICommonForm {
  alternateContact?: string;
}
export interface IDynamicForm extends ICommonForm {
  relation?: string;
  officeAddress?: string;
}

export interface IForm extends IAddress, IMainForm, IDynamicForm {
  city?: string;
  mainMemberName?: string;
  age?: number;
  excelRowId?: number | string;
}
export interface IFormColumns {
  label: string;
  key: ALL_COLUMNS;
  type?: 'image' | 'text' | 'date';
}

export type IExcelStrictData = Record<ALL_COLUMNS, unknown>;

export type IExcelData = Record<string, unknown>;
