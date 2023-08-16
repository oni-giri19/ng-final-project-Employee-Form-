import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-dlt-confirm',
  templateUrl: './emp-dlt-confirm.component.html',
  styleUrls: ['./emp-dlt-confirm.component.css'],
})
export class EmpDLTConfirmComponent {
  constructor(
    private dialogRef: MatDialogRef<EmpDLTConfirmComponent>,
    private empService: EmployeeService,
    private coreService: CoreService,
    @Inject(MAT_DIALOG_DATA)
    public data: { employeeId: number; employeeName: string } // Inject data object
  ) {}

  onEmpDeleteConfirm() {
    const id = this.data.employeeId; // Access employeeId from the data object
    this.empService.empDelete(id).subscribe({
      next: () => {
        this.coreService.openSnackBar('Employee Removed Successfully');
        this.dialogRef.close(true);
      },
      error: console.log,
    });
  }
}
