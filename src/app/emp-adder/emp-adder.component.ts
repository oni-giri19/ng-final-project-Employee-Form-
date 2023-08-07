import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-adder',
  templateUrl: './emp-adder.component.html',
  styleUrls: ['./emp-adder.component.css'],
})
export class EmpAdderComponent implements OnInit {
  //Declared employee form here
  empForm: FormGroup;
  //Created array of education levels here
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
    private coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[A-z]/),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[A-z]/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required, this.validateAge]],
      gender: '',
      education: ['no education', Validators.required],
      company: ['', [Validators.required]],
      experience: ['', [Validators.min(0), Validators.required]],
      expectedSalary: ['', [Validators.min(0), Validators.required]],
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
            this.coreService.openSnackBar('updated successfully');
            this.dialogRef.close(true);
          },
          error: (error: any) => {
            console.error(error);
          },
        });
      } else {
        this.empService.addEmp(this.empForm.value).subscribe({
          next: (value: any) => {
            this.coreService.openSnackBar('employee added successfully');
            this.dialogRef.close(true);
          },
          error: (error: any) => {
            console.error(error);
          },
        });
      }
    }
  }
  //Get controls so they're easily accessable
  get controls() {
    return this.empForm.controls;
  }
  //this validates DOB to be >18 years of age
  validateAge(control: any) {
    const today = new Date();
    const birthDate = new Date(control.value);
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 18) {
      return { invalidAge: true };
    }

    return null;
  }
}
