import { ControlType, DirectionType } from '../enum/mower.enum';
import { CommonService } from '../service/common.service';

export class Mower {
  x: number;
  y: number;
  direction: DirectionType;
  moves: ControlType[] = [];
  lawnConfig: {x, y};
  mowerColor: string;

  constructor(x: number, y: number, direction: DirectionType, moves: ControlType[]) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.moves = moves;
    this.mowerColor = CommonService.getRandomColor();
  }

  setLawnConfig(lawnConfig: { x, y }): void {
    this.lawnConfig = lawnConfig;
  }

  move(control: ControlType): void {
    switch (control) {
      case ControlType.FORWARD:
        this._moveForward();
        break;
      case ControlType.LEFT:
        this._turnLeft();
        break;
      case ControlType.RIGHT:
        this._turnRight();
        break;
      default:
        break;
    }
  }

  private _moveForward(): void {
    switch (this.direction) {
      case DirectionType.NORTH:
        this._goNorth();
        break;
      case DirectionType.EAST:
        this._goEast();
        break;
      case DirectionType.WEST:
        this._goWest();
        break;
      case DirectionType.SOUTH:
        this._goSouth();
        break;
      default:
        break;
    }
  }

  private _turnLeft(): void {
    switch (this.direction) {
      case DirectionType.NORTH:
        this.direction = DirectionType.WEST;
        break;
      case DirectionType.EAST:
        this.direction = DirectionType.NORTH;
        break;
      case DirectionType.WEST:
        this.direction = DirectionType.SOUTH;
        break;
      case DirectionType.SOUTH:
        this.direction = DirectionType.EAST;
        break;
    }
  }

  private _turnRight(): void {
    switch (this.direction) {
      case DirectionType.NORTH:
        this.direction = DirectionType.EAST;
        break;
      case DirectionType.EAST:
        this.direction = DirectionType.SOUTH;
        break;
      case DirectionType.WEST:
        this.direction = DirectionType.NORTH;
        break;
      case DirectionType.SOUTH:
        this.direction = DirectionType.WEST;
        break;
    }
  }

  private _goNorth(): void {
    if (this.y < this.lawnConfig.y) {
      this.y++;
    }
  }
  private _goEast(): void {
    if (this.x < this.lawnConfig.x) {
      this.x++;
    }
  }
  private _goWest(): void {
    if (this.x > 0) {
      this.x--;
    }
  }
  private _goSouth(): void {
    if (this.y > 0) {
      this.y--;
    }
  }
}
