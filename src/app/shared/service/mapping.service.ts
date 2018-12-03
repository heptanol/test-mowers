import { Injectable } from '@angular/core';

import { ControlType, DirectionType } from '../enum/mower.enum';
import { Mower } from '../model/mower.model';
import { Coordinate } from '../model/coordinate.model';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor() { }

  getLawn(input: string): Coordinate {
    let lawnParameters = { x: 0, y: 0 };
    const inputArray = input.split('\n');
    if (!inputArray || inputArray.length === 0) {
      console.error('Lawn inputs not found');
      return lawnParameters;
    }
    const lawnArray = inputArray[0].split(' ');
    if (!lawnArray || lawnArray.length < 2) {
      console.error('Lawn inputs invalid');
      return lawnParameters;
    }

    return { x: Number.parseInt(lawnArray[0]), y: Number.parseInt(lawnArray[1]) };
  }


  initMowers(input: string, lawnLimit: Coordinate): Mower[] {
    let mowers: Mower[] = [];
    const inputArray = input.split('\n');
    inputArray.shift();
    for (let i = 0; i < inputArray.length; i = i + 2) {
      const mowerArray = inputArray[i].split(' ');
      if (!mowerArray || mowerArray.length !== 3) {
        console.error('Mower inputs invalid');
        break;
      }
      if (!inputArray[i+1]) {
        console.error('Mower has no moves');
      }
      const moveArray = inputArray[i+1].split('');
      const mower = new Mower(
        Number.parseInt(mowerArray[0]),
        Number.parseInt(mowerArray[1]),
        <DirectionType>mowerArray[2],
        <ControlType[]>moveArray
      );
      mower.setLawnConfig(lawnLimit);
      mowers.push(mower);
    }

    return mowers;
  }
}
