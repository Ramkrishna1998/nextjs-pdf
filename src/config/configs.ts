import { content } from 'contentFromCMS';
import { ALL_COLUMNS, COLUMN_METADATA } from '@/src/types/sheet';

/**
 * If any Changes in column name or colum header swaps, please update this sheet config
 */

export const START_LETTER = 'A';
export const END_LETTER = 'U';

export const SHEET_CONFIG: Record<ALL_COLUMNS, COLUMN_METADATA> = {
  village: {
    idx: 0,
    key: 'village',
    excelHeader: 'Village',
    columnName: 'A',
    label: content.forms.village,
  },
  email: {
    idx: 1,
    key: 'email',
    excelHeader: 'Email',
    columnName: 'B',
    label: content.forms.email,
  },
  residentialAddress: {
    idx: 2,
    key: 'residentialAddress',
    excelHeader: 'Residential Address',
    label: content.forms.residentialAddress,
    columnName: 'C',
  },
  city: { idx: 3, key: 'city', excelHeader: 'City', columnName: 'D', label: content.forms.city },
  officeAddress: {
    idx: 4,
    key: 'officeAddress',
    excelHeader: 'Office Address',
    columnName: 'E',
    label: content.forms.officeAddress,
  },
  mainMemberName: {
    idx: 5,
    key: 'mainMemberName',
    excelHeader: 'Main Member Name',
    columnName: 'F',
    label: content.forms.mainMemberName,
  },
  fullName: {
    idx: 6,
    key: 'fullName',
    excelHeader: 'Full Name',
    columnName: 'G',
    label: content.forms.fullName,
  },

  firstName: {
    idx: 7,
    key: 'firstName',
    excelHeader: 'FirstName',
    columnName: 'H',
    label: content.forms.firstName,
  },
  middleName: {
    idx: 8,
    key: 'middleName',
    excelHeader: 'MiddleName',
    columnName: 'I',
    label: content.forms.middleName,
  },
  lastName: {
    idx: 9,
    key: 'lastName',
    excelHeader: 'LastName',
    columnName: 'J',
    label: content.forms.lastName,
  },
  relation: {
    idx: 10,
    key: 'relation',
    excelHeader: 'Relation to Main Member',
    columnName: 'K',
    label: content.forms.relation,
  },
  dateOfBirth: {
    idx: 11,
    key: 'dateOfBirth',
    excelHeader: 'Date Of Birth',
    columnName: 'L',
    label: content.forms.dateOfBirth,
  },
  age: { idx: 12, key: 'age', excelHeader: 'Age', columnName: 'M', label: content.forms.age },
  bloodGroup: {
    idx: 13,
    key: 'bloodGroup',
    excelHeader: 'Blood Group',
    columnName: 'N',
    label: content.forms.bloodGroup,
  },
  maritialStatus: {
    idx: 14,
    key: 'maritialStatus',
    excelHeader: 'Maritial Status',
    columnName: 'O',
    label: content.forms.maritialStatus,
  },
  education: {
    idx: 15,
    key: 'education',
    excelHeader: 'Education',
    columnName: 'P',
    label: content.forms.education,
  },
  marriageDate: {
    idx: 16,
    key: 'marriageDate',
    excelHeader: 'Marriage Date',
    columnName: 'Q',
    label: content.forms.marriageDate,
  },
  contactNumber: {
    idx: 17,
    key: 'contactNumber',
    excelHeader: 'Contact No',
    columnName: 'R',
    label: content.forms.contactNumber,
  },
  alternateContact: {
    idx: 18,
    key: 'alternateContact',
    excelHeader: 'Alternate Contact Number',
    columnName: 'S',
    label: content.forms.alternateContact,
  },
  createdAt: {
    idx: 19,
    key: 'createdAt',
    excelHeader: 'Created Date',
    columnName: 'T',
    label: content.forms.createdAt,
  },
  profilePic: {
    idx: 20,
    key: 'profilePic',
    excelHeader: 'Profile Picture',
    columnName: 'U',
    label: content.forms.profilePic,
  },
};

export const COLUMN_MAPPING: Record<string, COLUMN_METADATA> = {
  [SHEET_CONFIG.village.excelHeader]: SHEET_CONFIG.village,
  [SHEET_CONFIG.email.excelHeader]: SHEET_CONFIG.email,
  [SHEET_CONFIG.residentialAddress.excelHeader]: SHEET_CONFIG.residentialAddress,
  [SHEET_CONFIG.officeAddress.excelHeader]: SHEET_CONFIG.officeAddress,
  [SHEET_CONFIG.firstName.excelHeader]: SHEET_CONFIG.firstName,
  [SHEET_CONFIG.fullName.excelHeader]: SHEET_CONFIG.fullName,
  [SHEET_CONFIG.age.excelHeader]: SHEET_CONFIG.age,
  [SHEET_CONFIG.city.excelHeader]: SHEET_CONFIG.city,
  [SHEET_CONFIG.lastName.excelHeader]: SHEET_CONFIG.lastName,
  [SHEET_CONFIG.middleName.excelHeader]: SHEET_CONFIG.middleName,
  [SHEET_CONFIG.mainMemberName.excelHeader]: SHEET_CONFIG.mainMemberName,
  [SHEET_CONFIG.dateOfBirth.excelHeader]: SHEET_CONFIG.dateOfBirth,
  [SHEET_CONFIG.bloodGroup.excelHeader]: SHEET_CONFIG.bloodGroup,
  [SHEET_CONFIG.maritialStatus.excelHeader]: SHEET_CONFIG.maritialStatus,
  [SHEET_CONFIG.education.excelHeader]: SHEET_CONFIG.education,
  [SHEET_CONFIG.marriageDate.excelHeader]: SHEET_CONFIG.marriageDate,
  [SHEET_CONFIG.contactNumber.excelHeader]: SHEET_CONFIG.contactNumber,
  [SHEET_CONFIG.alternateContact.excelHeader]: SHEET_CONFIG.alternateContact,
  [SHEET_CONFIG.relation.excelHeader]: SHEET_CONFIG.relation,
  [SHEET_CONFIG.createdAt.excelHeader]: SHEET_CONFIG.createdAt,
  [SHEET_CONFIG.profilePic.excelHeader]: SHEET_CONFIG.profilePic,
};

export const NUMBER_MAPPING: Record<string, COLUMN_METADATA> = {
  [SHEET_CONFIG.village.idx]: SHEET_CONFIG.village,
  [SHEET_CONFIG.email.idx]: SHEET_CONFIG.email,
  [SHEET_CONFIG.residentialAddress.idx]: SHEET_CONFIG.residentialAddress,
  [SHEET_CONFIG.officeAddress.idx]: SHEET_CONFIG.officeAddress,
  [SHEET_CONFIG.firstName.idx]: SHEET_CONFIG.firstName,
  [SHEET_CONFIG.fullName.idx]: SHEET_CONFIG.fullName,
  [SHEET_CONFIG.age.idx]: SHEET_CONFIG.age,
  [SHEET_CONFIG.city.idx]: SHEET_CONFIG.city,
  [SHEET_CONFIG.lastName.idx]: SHEET_CONFIG.lastName,
  [SHEET_CONFIG.middleName.idx]: SHEET_CONFIG.middleName,
  [SHEET_CONFIG.mainMemberName.idx]: SHEET_CONFIG.mainMemberName,
  [SHEET_CONFIG.dateOfBirth.idx]: SHEET_CONFIG.dateOfBirth,
  [SHEET_CONFIG.bloodGroup.idx]: SHEET_CONFIG.bloodGroup,
  [SHEET_CONFIG.maritialStatus.idx]: SHEET_CONFIG.maritialStatus,
  [SHEET_CONFIG.education.idx]: SHEET_CONFIG.education,
  [SHEET_CONFIG.marriageDate.idx]: SHEET_CONFIG.marriageDate,
  [SHEET_CONFIG.contactNumber.idx]: SHEET_CONFIG.contactNumber,
  [SHEET_CONFIG.alternateContact.idx]: SHEET_CONFIG.alternateContact,
  [SHEET_CONFIG.relation.idx]: SHEET_CONFIG.relation,
  [SHEET_CONFIG.createdAt.idx]: SHEET_CONFIG.createdAt,
  [SHEET_CONFIG.profilePic.idx]: SHEET_CONFIG.profilePic,
};
