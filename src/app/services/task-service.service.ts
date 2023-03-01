import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  readonly apiUrl: string;
  readonly headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${environment.server}/tasks`;
    this.headers = new HttpHeaders({ 'content-type': 'application/json' });
  }


  sendReminder() {

  }


  // GET ONE
  getById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.headers,
    });
  }

  // GET ALL
  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl, {
      headers: this.headers,
    });
  }


  // POST
  add(any: any): Observable<any> {


    return this.httpClient.post<any>(this.apiUrl, any);
  }

  // PUT
  updateTask(any: any): Observable<any> {
    return this.httpClient.post<any>(
      this.apiUrl,
      any,
      { headers: this.headers }
    );
  }

  // DELETE
  delete(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text',
    });
  }

}
