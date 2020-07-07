import { Controller, Body, Post, UseBefore } from "routing-controllers";
import { RegisterDTO, LoginDTO } from "./user.dto";
import validator from "../../middlewares/validation.middleware";
import { UsersServices } from "./";

@Controller("/users")
export class UsersController {
  constructor(private usersService = new UsersServices()) {}

  @Post("/login")
  @UseBefore(validator(LoginDTO))
  async login(@Body() params: LoginDTO) {
    return this.usersService.login(params);
  }

  @Post("/register")
  @UseBefore(validator(RegisterDTO))
  async registerUser(@Body() params: RegisterDTO) {
    const result = await this.usersService.registerUser(params);

    return {
      id: result.id,
      name: result.name,
      email: result.email,
    };
  }
}
