import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-from-cetecory',
  standalone: true,
  templateUrl: './from-cetecory.html',
  styleUrls: ['./from-cetecory.css'],
})
export class FromCetecory {
  @Input() product: any;
}
