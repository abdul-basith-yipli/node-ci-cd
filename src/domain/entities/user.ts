export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public name: string
  ) {}

  // Optional: Add validation methods
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
