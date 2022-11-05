import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { envVars } from '@/config';
import { Logger } from '@/utils';

export class ApiCaller {
  static httpGet = async (url: string): Promise<AxiosResponse<unknown>> => {
    try {
      const URL = `${envVars.baseUrl}${url}`;
      const headers = {};
      const method = 'GET';
      const options: AxiosRequestConfig = { headers, method, url: URL };
      const res = await axios(options);
      return res;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  };

  static httpPost = async (data: unknown, url: string): Promise<AxiosResponse<unknown>> => {
    try {
      const URL = `${envVars.baseUrl}${url}`;
      const method = 'POST';
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
      const options: AxiosRequestConfig = { headers, method, url: URL, data };
      const res = await axios(options);
      return res;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  };

  static httpPut = async (payload: unknown, url: string): Promise<AxiosResponse<unknown>> => {
    try {
      const URL = `${envVars.baseUrl}${url}`;
      const method = 'PUT';
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
      const data = JSON.stringify(payload);
      const options: AxiosRequestConfig = { headers, method, url: URL, data };
      const res = await axios(options);
      return res;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  };

  static httpPatch = async (payload: unknown, url: string): Promise<AxiosResponse<unknown>> => {
    try {
      const URL = `${envVars.baseUrl}${url}`;
      const method = 'PATCH';
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
      const data = JSON.stringify(payload);
      const options: AxiosRequestConfig = { headers, method, url: URL, data };
      const res = await axios(options);
      return res;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  };

  static httpDelete = async (url: string): Promise<AxiosResponse<unknown>> => {
    try {
      const URL = `${envVars.baseUrl}${url}`;
      const headers = {};
      const method = 'DELETE';
      const options: AxiosRequestConfig = { headers, method, url: URL };
      const res = await axios(options);
      return res;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  };

  static upload = async (data: File[], url: string): Promise<AxiosResponse<unknown>> => {
    try {
      const URL = `${envVars.baseUrl}${url}`;
      const formData = new FormData();
      formData.append('imageFile', data[0]);
      const method = 'POST';
      const options: AxiosRequestConfig = { method, url: URL, data: formData };
      const res = await axios(options);
      return res;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  };

  static async uploadImage(formData: unknown): Promise<AxiosResponse<unknown>> {
    try {
      const URL = `${envVars.baseUrl}Fileupload`;
      const res = await axios.post(URL, formData, {
        // receive two parameter endpoint url ,form data
      });
      return res;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}
