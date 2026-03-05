import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
