import { User } from "@/database/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthChangePassword, AuthResetPassword, AuthSignIn, AuthSignUp, UserEmail, UserPassword } from "@/api/constants/user.constant";
import { AuthEmailService } from "@/email/services/auth_email.service";
import { ConfigService } from "@nestjs/config";
import { Token } from "@/database/entities/token.entity";

@Injectable()
export class AuthService { 
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly emailService: AuthEmailService,
    private readonly configService: ConfigService,    
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>
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
    
    const matchedPasswords = await bcrypt.compare(credentials.password, existingUser.password)
    
    if (!matchedPasswords) throw new Error("The passwords doesn't match")
    
    const payload = {
      sub: existingUser.id,
      email: existingUser.email
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  /******************************/
  
  async forgotPasswordService(
    credentials: UserEmail
  ): Promise<void> {
    const existingUser = await this.authRepository.findOne({
      where: { email: credentials.email }
    })

    if (!existingUser) throw new Error("User with this email doesn't exist")
    
    await this.emailService.sendResetPasswordLinkMail(credentials.email)
  }

  async resetPasswordService(
    credentials: AuthResetPassword
  ): Promise<void> {
    const emailTokenSecret = this.configService.get<string>("JWT_EMAIL_TOKEN_SECRET")
    
    const tokenFound = await this.tokenRepository.findOne({
      where: { token: credentials.token }
    })

    if(!tokenFound) throw new Error("Invalid token or it has already been used")

    const token = await this.jwtService.verifyAsync(credentials.token, {
      secret: emailTokenSecret
    })

    if (credentials.email !== token.email) throw new Error("Invalid token for this email")

    const user = await this.authRepository.findOne({
      where: { email: token.email }
    })

    if (!user) throw new Error("User with this email doesn't exist")
    
    const matchedPasswords = await bcrypt.compare(credentials.password, user.password)
    
    if (matchedPasswords) throw new Error("Can not create an already existing password")
    
    const newPassword = await bcrypt.hash(credentials.password, 10)

    await this.authRepository.update({ email: user.email }, { password: newPassword })
  }

  /******************************/

  async changePasswordService(
    credentials: AuthChangePassword
  ): Promise<void> {
    const user = await this.authRepository.findOne({
      where: { email: credentials.email }
    })

    if (!user) throw new Error("User with this email doesn't exist")
    
    const matchedPasswords = await bcrypt.compare(credentials.password, user.password)
    
    if (matchedPasswords) throw new Error("Can not create an already existing password")
    
    const newPassword = await bcrypt.hash(credentials.password, 10)
    
    await this.authRepository.update({ email: user.email }, { password: newPassword })    
  }
}