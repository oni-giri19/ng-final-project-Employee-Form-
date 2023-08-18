import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/types/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() user: User | null = null;
  @Output() signOut = new EventEmitter<void>();
}
