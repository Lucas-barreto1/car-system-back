export class BrandNotFoundError extends Error {
  constructor() {
    super();
    this.name = 'BrandNotFoundError';
    this.message = 'Brand not found';
  }
}
