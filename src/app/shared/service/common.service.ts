export class CommonService {

  static getRandomColor(): string {
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  }

}
