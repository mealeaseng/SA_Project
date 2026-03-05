import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-typesolfdrink',
  imports: [NgIf, NgFor, CurrencyPipe],
  templateUrl: './typesolfdrink.html',
  styleUrl: './typesolfdrink.css',
})
export class Typesolfdrink {}
