import { IResponseBody } from '../api';
import { ApiCaller as axios } from '../apiCaller';
import { getCached } from '../helper';
import { SHEET_CONFIG } from '@/config';
import { IDashboardResponse, IEventResponse } from '@/src/types/events';
import type {
  IExcelAddRequest,
  IExcelGetOptionsResponse,
  IExcelGetRowsRequest,
  IExcelGetRowsResponse,
  IExcelUpdateRequest,
} from '@/src/types/excel';
import { Logger } from '@/utils';

class MainApi {
  private static base = `api/person`;

  public static async addData(data: IExcelAddRequest): Promise<any> {
    try {
      const res = await axios.httpPost(data, this.base);
      Logger.debug('MainApi.signup() Response::', res);
      return res;
    } catch (err: unknown) {
      Logger.error('MainApi.signup() ERROR::', err);
      throw err;
    }
  }

  public static async getOptions(): Promise<IResponseBody<IExcelGetOptionsResponse>> {
    try {
      const key = ['getOptions'];
      const res = await getCached<IResponseBody<IExcelGetOptionsResponse>>(key, () =>
        axios.httpGet(`${MainApi.base}/column/${SHEET_CONFIG.mainMemberName.key}`)
      );
      Logger.debug('MainApi.getOptions() Response::', res);
      return res;
    } catch (err: unknown) {
      Logger.error('MainApi.getOptions() ERROR::', err);
      throw err;
    }
  }

  public static async getRows({
    values,
  }: IExcelGetRowsRequest): Promise<IResponseBody<IExcelGetRowsResponse>> {
    try {
      const query = values.join('/');
      const key = ['getRows', query];
      const res = await getCached<IResponseBody<IExcelGetRowsResponse>>(key, () =>
        axios.httpGet(`${MainApi.base}/get/${query}`)
      );
      Logger.debug('MainApi.getRows() Response::', res);
      return res;
    } catch (err: unknown) {
      Logger.error('MainApi.getRows() ERROR::', err);
      throw err;
    }
  }

  public static async updateData(data: IExcelUpdateRequest): Promise<IResponseBody<any[]>> {
    try {
      const res = await axios.httpPut(data, MainApi.base);
      Logger.debug('MainApi.updateData() Response::', res);
      return res.data as IResponseBody<any[]>;
    } catch (err: unknown) {
      Logger.error('MainApi.updateData() ERROR::', err);
      throw err;
    }
  }

  public static async getEvents(): Promise<IResponseBody<IEventResponse>> {
    try {
      const key = ['getEvents'];
      const res = await getCached<IResponseBody<IEventResponse>>(key, () =>
        axios.httpGet(`${MainApi.base}/events`)
      );
      Logger.debug('MainApi.getEvents() Response::', res);
      return res;
    } catch (err: unknown) {
      Logger.error('MainApi.getEvents() ERROR::', err);
      throw err;
    }
  }

  public static async getDashboardData(): Promise<IResponseBody<IDashboardResponse>> {
    try {
      const key = ['getDashboardData'];
      const res = await getCached<IResponseBody<IDashboardResponse>>(key, () =>
        axios.httpGet(`${MainApi.base}/dashboard`)
      );
      Logger.debug('MainApi.getDashboardData() Response::', res);
      return res;
    } catch (err: unknown) {
      Logger.error('MainApi.getDashboardData() ERROR::', err);
      throw err;
    }
  }
}
export default MainApi;
