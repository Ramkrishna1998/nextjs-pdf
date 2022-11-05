import { IAddress, IDynamicForm, IExcelData, IForm, IMainForm } from '../types/form';
import { SHEET_CONFIG } from '@/config';

export const isSSR = typeof window === 'undefined';
export const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

function calcAge(dateString: string) {
  const birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / 31557600000);
}
export const dataMapper = (data: IForm[]): IExcelData[] => {
  const newMappedData: IExcelData[] = [];
  for (let index = 0; index < data.length; index += 1) {
    const element = data[index];
    const age = element?.dateOfBirth ? calcAge(element?.dateOfBirth) : '';
    const fullName = `${element.firstName ?? ''} ${element.middleName ?? ''} ${
      element.lastName ?? ''
    }`;
    const newObj: IExcelData = {
      [SHEET_CONFIG.email.excelHeader]: element?.email
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.village.excelHeader]: element?.village,
      [SHEET_CONFIG.residentialAddress.excelHeader]: element?.residentialAddress
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.officeAddress.excelHeader]: element?.officeAddress
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.mainMemberName.excelHeader]: element?.mainMemberName
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.firstName.excelHeader]: element?.firstName
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.middleName.excelHeader]: element?.middleName
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.lastName.excelHeader]: element?.lastName
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.fullName.excelHeader]: fullName
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.dateOfBirth.excelHeader]: element?.dateOfBirth,
      [SHEET_CONFIG.bloodGroup.excelHeader]: element?.bloodGroup,
      [SHEET_CONFIG.maritialStatus.excelHeader]: element?.maritialStatus,
      [SHEET_CONFIG.education.excelHeader]: element?.education
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.marriageDate.excelHeader]: element?.marriageDate,
      [SHEET_CONFIG.age.excelHeader]: age,
      [SHEET_CONFIG.contactNumber.excelHeader]: element?.contactNumber,
      [SHEET_CONFIG.alternateContact.excelHeader]: element?.alternateContact,
      [SHEET_CONFIG.relation.excelHeader]: element?.relation
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),

      [SHEET_CONFIG.createdAt.excelHeader]: new Date().toLocaleString(),
      [SHEET_CONFIG.profilePic.excelHeader]: element?.profilePic,
    };
    newMappedData.push(newObj);
  }

  return newMappedData;
};

export const excelDataMapper = (data: IForm[]): IForm[] => {
  const newMappedData: IForm[] = [];
  for (let index = 0; index < data.length; index += 1) {
    const element = data[index];
    const age = element?.dateOfBirth ? calcAge(element?.dateOfBirth) : '';
    const fullName = `${element.firstName ?? ''} ${element.middleName ?? ''} ${
      element.lastName ?? ''
    }`;
    const newObj: IForm = {
      excelRowId: element.excelRowId,
      [SHEET_CONFIG.email.key]: element?.email
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.village.key]: element?.village,
      [SHEET_CONFIG.city.key]: element?.city
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.residentialAddress.key]: element?.residentialAddress
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.officeAddress.key]: element?.officeAddress
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.mainMemberName.key]: element?.mainMemberName
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.firstName.key]: element?.firstName
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.middleName.key]: element?.middleName
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.lastName.key]: element?.lastName
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.fullName.key]: fullName
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.dateOfBirth.key]: element?.dateOfBirth,
      [SHEET_CONFIG.bloodGroup.key]: element?.bloodGroup,
      [SHEET_CONFIG.maritialStatus.key]: element?.maritialStatus,
      [SHEET_CONFIG.education.key]: element?.education
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.marriageDate.key]: element?.marriageDate,
      [SHEET_CONFIG.age.key]: age,
      [SHEET_CONFIG.contactNumber.key]: element?.contactNumber,
      [SHEET_CONFIG.alternateContact.key]: element?.alternateContact,
      [SHEET_CONFIG.relation.key]: element?.relation
        ?.toLowerCase()
        .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
      [SHEET_CONFIG.createdAt.key]: new Date().toLocaleString(),
      [SHEET_CONFIG.profilePic.key]: element?.profilePic,
    };
    newMappedData.push(newObj);
  }

  return newMappedData;
};

export const excelRows = (
  addressForm: IAddress,
  mainForm: IMainForm,
  dynamicForm: Record<number | string, IDynamicForm>
) => {
  const finalData: IForm[] = [];
  const mainMemberName = `${mainForm.firstName ?? ''} ${mainForm.middleName ?? ''} ${
    mainForm.lastName ?? ''
  }`;
  finalData.push({ ...mainForm, ...addressForm, mainMemberName, relation: 'Main' });
  delete addressForm.officeAddress;
  const memberData = Object.values(dynamicForm);
  if (memberData.length) {
    for (let index = 0; index < memberData.length; index += 1) {
      const element = memberData[index];
      finalData.push({ ...element, mainMemberName, ...addressForm });
    }
  }
  return finalData;
};

export const prepareRows = (data: IForm[]) => {
  const obj: Record<
    number,
    { data: Array<{ orderId: number; value: unknown }>; excelKey: string | number }
  > = {};
  const finalArr: Array<{ key: string | number; value: { values: [string[]] } }> = [];

  for (let index = 0; index < data.length; index += 1) {
    const arr: Array<{ orderId: number; value: unknown }> = [];
    const element = data[index];
    const excelKey = element.excelRowId || index;
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(element)) {
      if (SHEET_CONFIG[key] && (SHEET_CONFIG[key].idx || SHEET_CONFIG[key].idx === 0)) {
        arr.push({
          orderId: SHEET_CONFIG[key].idx,
          value,
        });
      }
    }
    obj[index] = { data: arr, excelKey };
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const [, value] of Object.entries(obj)) {
    const myData = [...value.data];
    myData.sort((a, b) => a.orderId - b.orderId);
    const newArr = myData.map((i) => i.value as string);
    finalArr.push({ key: value.excelKey, value: { values: [newArr] } });
  }
  return finalArr;
};

export const niceBytes = (x: any) => {
  let l = 0;
  let n = parseInt(x, 10) || 0;
  // eslint-disable-next-line no-plusplus
  while (n >= 1024 && ++l) {
    n /= 1024;
  }
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
};
