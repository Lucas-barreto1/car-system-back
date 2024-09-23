import { Id } from 'src/domain/value-objects/id';

export type BrandInput = {
  id?: string;
  name: string;
  createdDate?: Date;
  updatedDate?: Date;
};

export class Brand {
  readonly id: string;
  readonly name: string;
  readonly createdDate: Date;
  readonly updatedDate: Date;

  constructor(brandInput: BrandInput) {
    this.id = brandInput.id
      ? new Id(brandInput.id).toString()
      : new Id().toString();
    this.name = brandInput.name;
    this.createdDate = brandInput.createdDate || new Date();
    this.updatedDate = brandInput.updatedDate || new Date();
  }
}
