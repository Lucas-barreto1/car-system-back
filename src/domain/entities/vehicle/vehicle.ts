import { Id } from 'src/domain/value-objects/id';
import { Brand } from '../brand/brand';

export type VehicleInput = {
  id?: string;
  model: string;
  make: string;
  year: number;
  color: string;
  price: number;
  createdDate?: Date;
  updatedDate?: Date;
  brand?: Brand;
};

export class Vehicle {
  readonly id: string;
  readonly model: string;
  readonly make: string;
  readonly year: number;
  readonly color: string;
  readonly price: number;
  readonly createdDate: Date;
  readonly updatedDate: Date;
  readonly brand: Brand;

  constructor(vehicleInput: VehicleInput) {
    this.id = vehicleInput.id
      ? new Id(vehicleInput.id).toString()
      : new Id().toString();
    this.model = vehicleInput.model;
    this.make = vehicleInput.make;
    this.year = vehicleInput.year;
    this.color = vehicleInput.color;
    this.price = vehicleInput.price;
    this.createdDate = vehicleInput.createdDate || new Date();
    this.updatedDate = vehicleInput.updatedDate || new Date();
    this.brand = vehicleInput.brand;
  }
}
