import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-from-cetecory',
  imports: [NgFor],
  templateUrl: './from-cetecory.html',
  styleUrl: './from-cetecory.css',
})
export class FromCetecory {
  products = [
    { id: 1, name: 'Soft Drink' },
    { id: 2, name: 'Soft Drink' },
    { id: 3, name: 'Soft Drink' },
    { id: 4, name: 'Soft Drink' },
  ];
}
