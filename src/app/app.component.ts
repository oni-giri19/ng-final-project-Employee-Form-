import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAdderComponent } from './emp-adder/emp-adder.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private empService: EmployeeService) {}

  ngOnInit(): void {
    this.onGetEmpList();
  }

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

  onGetEmpList() {
    this.empService.getEmpList().subscribe({
      next: (response: any) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEmpDelete(id: number) {
    this.empService.empDelete(id).subscribe({
      next: (response) => {
        alert('Employee Removed Successfully');
        this.onGetEmpList();
      },
      error: console.log,
    });
  }
  empEditForm(data: any) {
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
