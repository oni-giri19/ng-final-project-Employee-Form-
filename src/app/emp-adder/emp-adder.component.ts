import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-adder',
  templateUrl: './emp-adder.component.html',
  styleUrls: ['./emp-adder.component.css'],
})
export class EmpAdderComponent implements OnInit {
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
    private dialogRef: MatDialogRef<EmpAdderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.empService.editEmp(this.data.id, this.empForm.value).subscribe({
          next: (value: any) => {
            alert('updated successfully');
            this.dialogRef.close(true);
          },
          error: (error: any) => {
            console.error(error);
          },
        });
      } else {
        this.empService.addEmp(this.empForm.value).subscribe({
          next: (value: any) => {
            alert('employee added successfully');
            this.dialogRef.close(true);
          },
          error: (error: any) => {
            console.error(error);
          },
        });
      }
    }
  }
}
