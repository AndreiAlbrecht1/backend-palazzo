import AuthService from '../../application/services/AuthService.js';
import { LoginDTO } from '../dtos/LoginDTO.js';
import { CreateUserDTO } from '../dtos/CreateUserDTO.js';

export default class AuthController {
  static async login(req, res) {
    const loginData = req.body;

    const loginDTO = new LoginDTO(loginData);

    const tokens = await AuthService.login(loginDTO);

    return res.status(200).json(tokens);
  }
  static async register(req, res) {
    const registerData = req.body;

    const createUserDTO = new CreateUserDTO(registerData);

    const message = await AuthService.create(createUserDTO);

    return res.status(201).json(message);
  }
  static async refresh(req, res) {
    const { refreshToken } = req.body;

    const accessToken = await AuthService.refresh(refreshToken);

    return res.status(200).json(accessToken);
  }
  static async getMe(req, res) {
    const userId = req.user.id;

    const userData = await AuthService.getMe(userId);

    return res.status(200).json(userData);
  }
}
