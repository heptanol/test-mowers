import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  constructor(
    private http: HttpClient
  ) { }

  getInput(): Observable<any> {
    return this.http.get('assets/input/test.txt', {responseType: 'text'});
  }
}
