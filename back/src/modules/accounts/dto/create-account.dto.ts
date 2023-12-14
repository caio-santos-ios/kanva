import { ApiProperty } from "@nestjs/swagger";
import { hashSync } from "bcryptjs";
import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsString } from "class-validator";

export class CreateAccountDto {
    readonly id: number;
    
    @ApiProperty()
    @IsString()
    name: string
    
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsString()
    @Transform(({value}: {value: string}) => hashSync(value, 10), {
        groups: ['hashPassword']
    })
    password: string;

    @ApiProperty()
    token: string

    @ApiProperty()
    @IsBoolean()
    isValidated: boolean = false;
    
    @ApiProperty()
    student?: boolean;
    
    @ApiProperty()
    teacher?: boolean;
}
