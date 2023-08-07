import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  //Add employee to the list
  addEmp(data: any): Observable<any> {
    return this.http.post(' http://localhost:3000/employees', data);
  }
  //Edit employee info by ID
  editEmp(id: number, data: any): Observable<any> {
    return this.http.put(` http://localhost:3000/employees/${id}`, data);
  }
  //Get the list of all existing employees
  getEmpList(): Observable<any> {
    return this.http.get(' http://localhost:3000/employees');
  }
  //Delete employee by ID
  empDelete(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/employees/${id}`);
  }
}
