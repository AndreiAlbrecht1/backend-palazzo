export class CreateUserDTO {
  constructor({ name, email, phone, password, role = 'user' }) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.role = role;
  }
}
