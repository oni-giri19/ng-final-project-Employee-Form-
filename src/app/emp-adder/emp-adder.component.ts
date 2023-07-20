import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-adder',
  templateUrl: './emp-adder.component.html',
  styleUrls: ['./emp-adder.component.css'],
})
export class EmpAdderComponent {
  empForm: FormGroup;

  education: string[] = [
    'no education',
    'primary',
    "bachelor's",
    "master's",
    'doctoral or equivalent',
  ];

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private dialogRef: DialogRef<EmpAdderComponent>
  ) {
    this.empForm = this.fb.group({
      name: '',
      surname: '',
      email: '',
      dateOfBirth: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      expectedSalary: '',
    });
  }

  onSubmit() {
    if (this.empForm.valid) {
      this.empService.addEmp(this.empForm.value).subscribe({
        next: (value: any) => {
          alert('employee added successfully');
        },
        error: (error: any) => {
          console.error(error);
          this.dialogRef.close();
        },
      });
    }
  }
}
