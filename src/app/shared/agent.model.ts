import { Address } from './address.model';

export class Agent {
  constructor(
    public id: string,
    public name: string,
    public locations: Address[]
  ) {}
}
