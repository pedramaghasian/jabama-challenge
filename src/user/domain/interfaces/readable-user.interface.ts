export interface IReadableUser {
  readonly email: string;
  status: string;
  readonly lastName: string;
  readonly firstName: string;
  readonly gender: string;
  accessToken?: string;
}
