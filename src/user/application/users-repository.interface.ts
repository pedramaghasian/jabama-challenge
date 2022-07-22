import { CreateUserDto } from "../domain/dtos";

export interface IUsersRepository {
    create(data: CreateUserDto): any;
}
