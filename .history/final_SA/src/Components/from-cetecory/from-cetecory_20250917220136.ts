import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-from-cetecory',
  imports: [],
  templateUrl: './from-cetecory.html',
  styleUrl: './from-cetecory.css',
})
export class FromCetecory {
  @Input product: any;
}
