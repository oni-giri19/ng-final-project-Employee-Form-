import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  signInData = {
    username: '',
    password: '',
  };
  loading$ = this.authService.loading;
  errorMsg$ = this.authService.errorMsg;

  vm$ = combineLatest([this.loading$, this.errorMsg$]).pipe(
    map(([loading, errorMsg]) => ({ loading, errorMsg }))
  );

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  onSubmit() {
    const { username, password } = this.signInData;
    if (username && password) {
      this.authService.signIn(this.signInData).subscribe(() => {
        this.employeeService.getEmpList();
        // this.router.navigate(['/main']);
      });
    }
  }
}
