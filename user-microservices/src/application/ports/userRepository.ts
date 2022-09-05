import UserEntity from "@app/src/domain/entities/User";
import { userDto } from "./userDto";

export interface IUserRepository {
  createUser(userDto: userDto): Promise<userDto>
}