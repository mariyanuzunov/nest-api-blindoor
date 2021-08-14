export interface IUser extends Document {
  readonly _id?: string;
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly role?: string;
}
