export class Car {
  constructor(
    public id: string,
    public model: string,
    public brand: string,
    public carClass: string,
    public fuelType: string,
    public tankCapacity: number,
    public gas: boolean,
    public gearshiftType: string,
    public gearshiftNumberOfGears: string
  ) {}
}
