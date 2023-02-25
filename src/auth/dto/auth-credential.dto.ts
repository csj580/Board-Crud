/* eslint-disable prettier/prettier */
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

/* eslint-disable prettier/prettier */
export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })

    password: string;
}