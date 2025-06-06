import { hash, genSalt, compare } from 'bcrypt';

export async function Hash(password: string): Promise<string> {
  return hash(password, await genSalt());
}

export async function Compare(
  hashedPassword: string,
  password: string,
): Promise<Boolean> {
  return compare(hashedPassword, password);
}
