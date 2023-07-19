import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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
}
