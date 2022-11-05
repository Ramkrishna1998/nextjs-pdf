import { IResponseBody } from '../api';
import { ApiCaller as axios } from '../apiCaller';
import { File as CustomFile } from '@/server';
import { Logger } from '@/utils';

class ImageApi {
  private static base = `api/image`;

  public static async uploadImage(data: File[]): Promise<IResponseBody<CustomFile>> {
    try {
      const res = await axios.upload(data, this.base);
      Logger.debug('ImageApi.uploadImage() Response::', res);
      return res.data as IResponseBody<CustomFile>;
    } catch (err: unknown) {
      Logger.error('ImageApi.uploadImage() ERROR::', err);
      throw err;
    }
  }

  public static async removeImage(name: string, local: boolean): Promise<any> {
    try {
      const res = await axios.httpDelete(`${this.base}?name=${name}&local=${local}`);
      Logger.debug('ImageApi.removeImage() Response::', res);
      return {};
    } catch (err: unknown) {
      Logger.error('ImageApi.removeImage() ERROR::', err);
      throw err;
    }
  }
}
export default ImageApi;
