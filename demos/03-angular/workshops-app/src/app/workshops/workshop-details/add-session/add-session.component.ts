import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-session',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './add-session.component.html',
  styleUrl: './add-session.component.scss',
})
export class AddSessionComponent {}
