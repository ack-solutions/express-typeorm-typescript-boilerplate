export class BaseDTO {
  constructor(obj: any) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        this[key] = obj[key];
      }
    }
  }
}