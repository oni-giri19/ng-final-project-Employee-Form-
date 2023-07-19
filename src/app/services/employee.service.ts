import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  addEmp(data: any) {
    return this.http.post('http://localhost:3000/employees', data);
  }
}
