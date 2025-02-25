import { User } from "@/database/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthSignIn, AuthSignUp } from "@/api/constants/user.constant";

@Injectable()
export class AuthService { 
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }
  
  async signUpService(
    credentials: AuthSignUp
  ): Promise<{ access_token: string }> {
    const existingUser = await this.authRepository.findOne({
      where: { email: credentials.email }
    })

    if (existingUser) throw new Error("User with this email already exists")
    
    // HASHING PASSWORD
    const hashedPassword = await bcrypt.hash(credentials.password, 10)
    const newUser = this.authRepository.create({
      email: credentials.email,
      password: hashedPassword,
      role: credentials.role
    })

    const userCreated = await this.authRepository.save(newUser)
    const payload = {
      sub: userCreated.id,
      email: userCreated.email
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async signInService(
    credentials: AuthSignIn
  ): Promise<{ access_token: string }> {
    const existingUser = await this.authRepository.findOne({
      where: { email: credentials.email }
    })

    if (!existingUser) throw new Error("User with this email doesn't exist")
    
    const payload = {
      sub: existingUser.id,
      email: existingUser.email
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}