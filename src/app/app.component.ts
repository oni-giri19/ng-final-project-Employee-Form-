import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAdderComponent } from './emp-adder/emp-adder.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { Data } from '@angular/router';
import { EmpDLTConfirmComponent } from './emp-dlt-confirm/emp-dlt-confirm.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'gender',
    'email',
    'dateOfBirth',
    'education',
    'company',
    'experience',
    'expectedSalary',
    'action',
  ];
  //Using this makes the employee info table possible
  dataSource!: MatTableDataSource<string | null>; // changed type <any> to <string|null>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private empService: EmployeeService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.onGetEmpList();
  }
  //When "+employee" button is pressed emp-adder-component is opened
  empAddForm() {
    const dialogRef = this.dialog.open(EmpAdderComponent);
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.onGetEmpList();
        }
      },
    });
  }
  //employee delete before confirming the actual delete
  openDeleteDialog(employeeId: number, employeeName: string) {
    const deleteDialogRef = this.dialog.open(EmpDLTConfirmComponent, {
      data: { employeeId, employeeName },
    });
    deleteDialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.onGetEmpList();
        }
      },
    });
  }
  //Get employee list and manipulate data
  onGetEmpList() {
    this.empService.getEmpList().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error: string) => {
        console.log(error);
      },
    });
  }
  //Filter logic, as shown in material-angular example
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Employee delete logic
  // onEmpDelete(id: number) {
  //   this.empService.empDelete(id).subscribe({
  //     next: (response) => {
  //       this.coreService.openSnackBar('Employee Removed Successfully', 'done');
  //       this.onGetEmpList();
  //     },
  //     error: console.log,
  //   });
  // }

  //Employee edit info logic
  empEditForm(data: Data) {
    //set data type :Data instead of :any
    const dialogRef = this.dialog.open(EmpAdderComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.onGetEmpList();
        }
      },
    });
  }
}
