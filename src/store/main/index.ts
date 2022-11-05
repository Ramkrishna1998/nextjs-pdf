import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import ImageApi from '@/api/image-api';
import MainApi from '@/api/main-api';
import type { File as CustomFile } from '@/server';
import { IDashboardResponse, IEventResponse } from '@/src/types/events';
import type { IAddress, IDynamicForm, IMainForm } from '@/src/types/form';
import { IMember } from '@/src/types/store';
import { dataMapper, Logger, excelDataMapper, excelRows, prepareRows } from '@/utils';

enableStaticRendering(typeof window === 'undefined');

const initialValues = {
  step: 0,
  options: {},
  loading: false,
  isValid: false,
  found: false,
  members: [],
  activeAccordion: [],
  addressForm: {},
  mainForm: {},
  dynamicForm: {},
  dashboardData: null,
  eventsData: null,
};
class MainStore {
  members!: IMember[];

  step!: number;

  addressForm!: IAddress;

  mainForm!: IMainForm;

  dynamicForm!: Record<number | string, IDynamicForm>;

  imageData!: Record<number | string, CustomFile | null>;

  isValid!: boolean;

  activeAccordion!: number[];

  loading!: boolean;

  found!: boolean;

  dashboardData!: IDashboardResponse | null;

  eventsData!: IEventResponse | null;

  options!: Record<string, { idx: number[]; name: string }>;

  constructor() {
    this.reset();
    makeAutoObservable(this);
  }

  reset = () => {
    Object.keys(initialValues).forEach((key) => {
      this[key] = initialValues[key as never];
    });
  };

  clearData = () => {
    this.found = false;
    this.mainForm = {};
    this.members = [];
    this.dynamicForm = {};
    this.addressForm = {};
    this.imageData = {};
  };

  toggleAccordion = (index: number) => {
    if (this.activeAccordion.includes(index)) {
      this.activeAccordion = this.activeAccordion.filter((i) => i !== index);
    } else {
      this.activeAccordion.push(index);
    }
  };

  setStep = (newStep: number) => {
    this.step = newStep;
  };

  setLoading = (value: boolean) => {
    this.loading = value;
  };

  setIsValid = (val: boolean) => {
    this.isValid = val;
  };

  updateAddressForm = (data: Partial<IAddress>) => {
    this.addressForm = Object.assign({}, this.addressForm, { ...data });
  };

  updateMainForm = (data: Partial<IMainForm>) => {
    this.mainForm = Object.assign({}, this.mainForm, { ...data });
  };

  updateDynamicForm = (index: string | number, data: Partial<IDynamicForm>) => {
    const newData = Object.assign({}, this.dynamicForm);
    newData[index] = Object.assign({}, newData[index], { ...data });
    this.dynamicForm = Object.assign({}, newData);
  };

  updateImageData = (index: string | number, data: Partial<CustomFile> | null) => {
    const newData = Object.assign({}, this.imageData);

    if (data) {
      newData[index] = Object.assign({}, newData[index], { ...data });
    } else {
      newData[index] = null;
    }
    this.imageData = Object.assign({}, newData);
  };

  addMember = () => {
    const newMembers = [...this.members];
    newMembers.push({ index: `${new Date().toISOString()}` });
    this.members = [...newMembers];
  };

  removeMember = (index: string | number) => {
    const newData = Object.assign({}, this.imageData);
    if (newData[index]) {
      ImageApi.removeImage(newData[index]?.filename as string, true).catch(console.error);
    }
    let newMembers = [...this.members];
    newMembers = newMembers.filter((i) => i.index !== index);
    delete this.dynamicForm[index];
    this.members = [...newMembers];
  };

  submit = async () => {
    try {
      this.setLoading(true);
      const finalData = excelRows(this.addressForm, this.mainForm, this.dynamicForm);
      const mappedData = dataMapper(finalData);
      await MainApi.addData({ values: mappedData });
      return;
    } catch (err: unknown) {
      Logger.error('MainStore.submit() ERROR::', err);
    } finally {
      this.setLoading(false);
    }
  };

  update = async () => {
    try {
      this.setLoading(true);
      const finalData = excelRows(this.addressForm, this.mainForm, this.dynamicForm);
      const mappedData = excelDataMapper(finalData);
      const finalArr = prepareRows(mappedData);
      await MainApi.updateData({ values: finalArr });
      return;
    } catch (err: unknown) {
      Logger.error('MainStore.update() ERROR::', err);
    } finally {
      this.setLoading(false);
    }
  };

  getOptions = async () => {
    try {
      const res = await MainApi.getOptions();
      this.options = res.payload;
    } catch (err: unknown) {
      Logger.error('MainStore.getOptions() ERROR::', err);
    }
  };

  getDashboardData = async () => {
    try {
      const res = await MainApi.getDashboardData();
      this.dashboardData = res.payload;
    } catch (err: unknown) {
      Logger.error('MainStore.getDashboardData() ERROR::', err);
    }
  };

  getEventsData = async () => {
    try {
      const res = await MainApi.getEvents();
      this.eventsData = res.payload;
    } catch (err: unknown) {
      Logger.error('MainStore.getEventsData() ERROR::', err);
    }
  };

  getRows = async (selectedName: string) => {
    try {
      this.setLoading(true);
      const rowsIds = this.options[selectedName].idx;
      if (!rowsIds.length) {
        return;
      }
      const res = (await MainApi.getRows({ values: rowsIds }))?.payload;
      const mainMemberData = res[0];
      this.mainForm = { ...mainMemberData };
      const dynamicFormData = {};
      for (let index = 1; index < res.length; index += 1) {
        const element = res[index];
        this.members.push({ index });
        dynamicFormData[index] = element;
      }
      this.addressForm = {
        village: mainMemberData.village,
        email: mainMemberData.email,
        officeAddress: mainMemberData.officeAddress,
        residentialAddress: mainMemberData.residentialAddress,
      };
      this.dynamicForm = { ...dynamicFormData };
      this.found = true;
    } catch (err: unknown) {
      Logger.error('MainStore.getRows() ERROR::', err);
    } finally {
      this.setLoading(false);
    }
  };
}

export default MainStore;
