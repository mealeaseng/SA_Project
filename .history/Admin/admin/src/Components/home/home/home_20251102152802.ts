import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
