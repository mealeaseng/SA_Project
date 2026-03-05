import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-from-cetecory',
  standalone: true,
  templateUrl: './from-cetecory.component.html',
  styleUrls: ['./from-cetecory.component.css'],
})
export class FromCetecory {
  @Input() product: any;
}
