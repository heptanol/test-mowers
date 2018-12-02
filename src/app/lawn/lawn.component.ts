import { Component, Input, OnInit } from '@angular/core';
import { InputService } from '../shared/service/input.service';
import { Mower } from '../shared/model/mower.model';
import { ControlType, DirectionType } from '../shared/enum/mower.enum';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-lawn',
  templateUrl: './lawn.component.html',
  styleUrls: ['./lawn.component.css']
})
export class LawnComponent implements OnInit {

  @Input() x: number;
  @Input() y: number;
  lawnGrid: { x, y }[] = [];
  mowers: Mower[] = [];
  isStarted = false;

  constructor(
    private inputService: InputService
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

  isMowerInCell(mower: Mower, cell: {x, y}): boolean {
    return mower.x === cell.x && mower.y === cell.y;
  }

  startMoves(): void {
    this.isStarted = true;
    this._moveMowerByIndex(0);
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

  private _buildLawn(input: string): void {
    const inputArray = input.split('\n');
    if (!inputArray || inputArray.length === 0) {
      console.error('Lawn inputs not found');
      return;
    }
    const lawnArray = inputArray[0].split(' ');
    if (!lawnArray || lawnArray.length < 2) {
      console.error('Lawn inputs invalid');
      return;
    }
    this.x = Number.parseInt(lawnArray[0]);
    this.y = Number.parseInt(lawnArray[1]);
    this._initMowers(inputArray);
    for (let y = this.y; y >= 0; y--) {
      for (let x = 0; x <= this.x; x++) {
        this.lawnGrid.push({x, y});
      }
    }
  }

  private _initMowers(input: string[]): void {
    input.shift();
    for (let i = 0; i < input.length; i = i + 2) {
      const mowerArray = input[i].split(' ');
      if (!mowerArray || mowerArray.length !== 3) {
        console.error('Mower inputs invalid');
        return;
      }
      if (!input[i+1]) {
        console.error('Mower has no moves');
      }
      const moveArray = input[i+1].split('');
      const mower = new Mower(
        Number.parseInt(mowerArray[0]),
        Number.parseInt(mowerArray[1]),
        <DirectionType>mowerArray[2],
        <ControlType[]>moveArray
      );
      mower.setLawnConfig({ x: this.x, y: this.y });
      this.mowers.push(mower)
    }
  }

}
