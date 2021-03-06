import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class DownloadService {
 
  constructor(private http: HttpClient) {
  }
 
  downloadFileSystem(filename: string): Observable<HttpResponse<string>> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'text/csv; charset=utf-8');
 
    return this.http.get('/api/attachment/getAttachment/' + filename, {
      headers: headers,
      observe: 'response',
      responseType: 'text'
    });
  }
 
  downloadClasspathFile(fileId: string): Observable<HttpResponse<string>> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'text/csv; charset=utf-8');
 
    return this.http.get('/api/attachment/getAttachment/' + fileId, {
      headers: headers,
      observe: 'response',
      responseType: 'text'
    });
  }
}