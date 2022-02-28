import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  private apiServerUrl = environment.apiBaseUrl;


  public get(action: string) {
    console.log("here in get");
    return this.httpClient.get(`${this.apiServerUrl}${action}`,{ responseType : 'json' , observe: 'response'});
  }
  public get2(action: string) {
    console.log("here in get");
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'image/jpeg',
      }),
      responseType: 'blob' // This tells angular to parse it as a blob, default is json
    };
    return this.httpClient.get(`${this.apiServerUrl}${action}`,{
      headers: new HttpHeaders({
        'Accept': 'image/jpeg',
      }),
      responseType: 'blob' // This tells angular to parse it as a blob, default is json
    });
  }

  public post(action: string, data: any) {
    console.log("here in post");
    console.log(data);

console.log()
    return this.httpClient.post(`${this.apiServerUrl}${action}`, data ,{ responseType : 'arraybuffer' , observe: 'response'});

  }

  public put(action: string, data: any) {
    return this.httpClient.put(`${this.apiServerUrl}${action}`, data);
  }
  public delete(action: string) {
    return this.httpClient.delete(`${this.apiServerUrl}${action}`);
  }
}
