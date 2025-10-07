export class UpdateUserDTO {
  constructor({ id, name, email, phone, password, newPassword }) {
    this.id = id;
    this.name = name ?? undefined;
    this.email = email ?? undefined;
    this.phone = phone ?? undefined;
    this.password = password ?? undefined;
    this.newPassword = newPassword ?? undefined;
  }
}
