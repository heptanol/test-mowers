import { Component, OnInit } from '@angular/core';
import { InputService } from '../shared/service/input.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

import { MappingService } from '../shared/service/mapping.service';
import { Mower } from '../shared/model/mower.model';
import { Coordinate } from '../shared/model/coordinate.model';

@Component({
  selector: 'app-lawn',
  templateUrl: './lawn.component.html',
  styleUrls: ['./lawn.component.css']
})
export class LawnComponent implements OnInit {

  lawnLimit : Coordinate;
  lawnGrid: Coordinate[] = [];
  mowers: Mower[] = [];
  isStarted = false;

  constructor(
    private inputService: InputService,
    private mappingService: MappingService
  ) { }

  ngOnInit(): void {
    this.setInput();
  }

  reset(): void {
    this.isStarted = false;
    this.mowers = [];
    this.lawnGrid = [];
    this.setInput();
  }

  showPositions(): void {
    let positionText = '';
    this.mowers.forEach(mower => positionText += mower.x + ' ' + mower.y + ' ' + mower.direction +'\n');
    alert(positionText);
  }

  setInput(): void {
    this.inputService.getInput().pipe(take(1))
      .subscribe(input => {
        this._buildLawn(input);
      });
  }

  isMowerInCell(mower: Mower, cell: Coordinate): boolean {
    return mower.x === cell.x && mower.y === cell.y;
  }

  startMoves(): void {
    this.isStarted = true;
    this._moveMowerByIndex(0);
  }

  private _buildLawn(input: string): void {
    this.lawnLimit = this.mappingService.getLawn(input);
    for (let y = this.lawnLimit.y; y >= 0; y--) {
      for (let x = 0; x <= this.lawnLimit.x; x++) {
        this.lawnGrid.push({x, y});
      }
    }
    this.mowers = this.mappingService.initMowers(input, this.lawnLimit);
  }

  private _moveMowerByIndex(index: number): void {
    const mower = this.mowers[index];
    if (!mower) {
      return;
    }
    console.log('Start Moving mower ', index);
    interval(1000)
      .pipe(
        take(mower.moves.length)
      ).subscribe(
        i => mower.move(mower.moves[i]),
      () => console.error(),
      () => {
        console.log('End Moving mower ', index);
        this._moveMowerByIndex(index + 1)
      }
    )
  }

}
