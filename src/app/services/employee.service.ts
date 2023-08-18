import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from 'src/environment/environment';
import { Data } from '@angular/router';
import { Employees } from 'src/types/employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  authUrl = ENVIRONMENT.authUrl;

  constructor(private http: HttpClient) {}
  //Add employee to the list
  addEmp(data: Data): Observable<Data> {
    //changed types from any to Data
    return this.http.post(' http://localhost:3000/employees', data);
  }
  //Edit employee info by ID
  editEmp(id: number, data: Employees) {
    return this.http.put(` http://localhost:3000/employees/${id}`, data);
  }
  //Get the list of all existing employees
  getEmpList(): Observable<any> {
    return this.http.get(' http://localhost:3000/employees');
  }
  //Delete employee by ID
  empDelete(id: number) {
    return this.http.delete(`http://localhost:3000/employees/${id}`);
  }
}
