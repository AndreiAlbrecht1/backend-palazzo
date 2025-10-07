import UsersRepository from '../../domain/repositories/UsersRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import { hashPassword, checkPasswordHash } from '../../shared/utils/hash.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../../shared/utils/jwt.js';
import {
  createUserSchema,
  loginSchema,
} from '../../domain/validators/userValidator.js';
import { MeDTO } from '../../http/dtos/MeDTO.js';

export default class AuthService {
  static async login(loginDTO) {
    const validatedLogin = loginSchema.parse(loginDTO);

    const user = await UsersRepository.findByEmail(validatedLogin.email);

    if (!user) {
      throw new AppError('Email not found.', 400);
    }

    const passwordMatch = await checkPasswordHash(
      validatedLogin.password,
      user.hashedPassword,
    );

    if (!passwordMatch) {
      throw new AppError('Invalid password.', 400);
    }

    const jwtUserPaylod = {
      id: user.id,
      email: user.email,
    };

    const accessToken = generateAccessToken(jwtUserPaylod);
    const refreshToken = generateRefreshToken(jwtUserPaylod);

    return { accessToken, refreshToken };
  }

  static async create(createUserDTO) {
    const validatedCreateUser = createUserSchema.parse(createUserDTO);

    const emailExists = await UsersRepository.findByEmail(
      validatedCreateUser.email,
    );

    if (emailExists) {
      throw new AppError('Email already registered.', 400);
    }

    const hashedPassword = await hashPassword(validatedCreateUser.password);

    const { password, ...userWithoutPassword } = validatedCreateUser;

    const userWithHashedPassword = {
      ...userWithoutPassword,
      hashedPassword,
    };

    const user = await UsersRepository.create(userWithHashedPassword);

    return user;
  }

  static async refresh(refreshToken) {
    if (!refreshToken) {
      throw new AppError('Refresh token not provided.', 401);
    }

    const { valid, decoded } = verifyRefreshToken(refreshToken);

    if (!valid) {
      throw new AppError('Invalid or expired refresh token.', 401);
    }

    const accessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
    });

    return { accessToken };
  }

  static async getMe(userId) {
    const user = await UsersRepository.getById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return new MeDTO(user);
  }
}
