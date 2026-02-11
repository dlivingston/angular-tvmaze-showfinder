import { Component } from '@angular/core';
import { SearchComponent } from './features/search/search.component';

@Component({
  selector: 'app-root',
  imports: [SearchComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
