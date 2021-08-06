import { Document } from 'mongoose';

export interface IUser {
  readonly _id?: string;
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
}
