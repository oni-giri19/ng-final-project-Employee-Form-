import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAdderComponent } from './emp-adder/emp-adder.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}

  empAddForm() {
    this.dialog.open(EmpAdderComponent);
  }
}
