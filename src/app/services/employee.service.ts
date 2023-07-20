import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  addEmp(data: any) {
    return this.http.post(' http://localhost:3000/employees', data);
  }

  getEmpList() {
    return this.http.get(' http://localhost:3000/employees');
  }

  empDelete(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/employees/${id}`);
  }
}
