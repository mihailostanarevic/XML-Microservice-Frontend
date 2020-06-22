import { Car } from './car.model';
import { Ad } from './ad.model';
import { Agent } from './agent.model';

export class Cart {
  constructor(
    public agent: Agent,
    public ad: Ad,
    public car: Car
  ) {}
}
