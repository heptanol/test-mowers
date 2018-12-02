import { Component, Input } from '@angular/core';

import { DirectionType } from '../shared/enum/mower.enum';

@Component({
  selector: 'app-mower',
  templateUrl: './mower.component.html',
  styleUrls: ['./mower.component.css']
})
export class MowerComponent {

  @Input() direction: DirectionType;
  DirectionType = DirectionType;
}
