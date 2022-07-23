import * as bcryptjs from 'bcryptjs';

export class Bcrypt {
  static hashPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, 8);
  }

  static comparePassword(
    enteredPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcryptjs.compare(enteredPassword, hashedPassword);
  }
}
