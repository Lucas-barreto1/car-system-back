export class VehicleNotFoundError extends Error {
  constructor() {
    super();
    this.name = 'VehicleNotFoundError';
    this.message = 'Vehicle not found';
  }
}
