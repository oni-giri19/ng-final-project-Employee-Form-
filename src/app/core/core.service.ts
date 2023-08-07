import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private _snackBar: MatSnackBar) {}
  //This line of code shows message top screen when employees are added
  openSnackBar(message: string, action: string = '👍') {
    this._snackBar.open(message, action, {
      duration: 1500,
      verticalPosition: 'top',
    });
  }
}
