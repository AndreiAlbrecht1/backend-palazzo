import UsersRepository from '../../domain/repositories/UsersRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import { updateUserSchema } from '../../domain/validators/userValidator.js';
import { hashPassword, checkPasswordHash } from '../../shared/utils/hash.js';

export default class UsersService {
  static async getAll() {
    const users = await UsersRepository.getAll();

    if (users.length === 0) {
      throw new AppError('Users not found.', 404);
    }

    return users;
  }

  static async getById(id) {
    const user = await UsersRepository.getById(id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }

  static async update(userDTO) {
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(userDTO).filter(([_, value]) => value !== undefined),
    );
    const validatedUser = updateUserSchema.parse(fieldsToUpdate);

    const user = await UsersRepository.getById(validatedUser.id);

    if (!user) {
      throw new AppError('No user found.', 404);
    }

    if (validatedUser.password) {
      const isPasswordValid = await checkPasswordHash(
        validatedUser.password,
        user.hashedPassword,
      );
      if (!isPasswordValid) {
        throw new AppError('Password is incorrect.', 400);
      }
    }

    if (validatedUser.newPassword) {
      validatedUser.hashedPassword = await hashPassword(
        validatedUser.newPassword,
      );
      delete validatedUser.newPassword;
      delete validatedUser.password;
    } else {
      delete validatedUser.password;
    }

    if (validatedUser.email && validatedUser.email !== user.email) {
      const emailExists = await UsersRepository.emailExists(
        validatedUser.email,
      );
      if (emailExists) {
        throw new AppError('Email already registered.', 400);
      }
    }

    const updatedUser = await UsersRepository.update(validatedUser);

    if (!updatedUser) {
      throw new AppError('No data was updated.', 404);
    }

    return updatedUser;
  }

  static async delete(id) {
    const success = await UsersRepository.delete(id);

    if (!success) {
      throw new AppError('User not found.', 404);
    }

    return;
  }
}
