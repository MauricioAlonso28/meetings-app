import { User } from "@/database/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthChangePassword, AuthCompleteName, AuthGetProfile, AuthGetProfileById, AuthId, AuthResetPassword, AuthSignIn, AuthSignUp, DeleteAccountCredentials, UserEmail, UserPassword } from "@/api/constants/user.constant";
import { AuthEmailService } from "@/email/services/auth_email.service";
import { ConfigService } from "@nestjs/config";
import { Token } from "@/database/entities/token.entity";
import { UserRole } from "@/database/enums/user.enum";

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
      role: credentials.role,
    })

    const userCreated = await this.authRepository.save(newUser)
    const payload = {
      sub: userCreated.id,
      email: userCreated.email,
      role: userCreated.role
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
      email: existingUser.email,
      role: existingUser.role
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

  /******************************/

  async disableProfileService(
    credentials: UserEmail
  ): Promise<void> {
    const user = await this.authRepository.findOne({
      where: {
        email: credentials.email
      }
    })

    if (!user) throw new Error("User with this email doesn't exist")
    if (user.disabled) throw new Error("User is already disabled")
    
    await this.authRepository.update({ email: user.email }, { disabled: true })
  }

  async enableProfileService(
    credentials: UserEmail
  ): Promise<void> {
    const user = await this.authRepository.findOne({
      where: {
        email: credentials.email
      }
    })
    if (!user) throw new Error("User with this email doesn't exist")
    if (!user.disabled) throw new Error("User is already enabled")
    
    await this.authRepository.update({ email: user.email }, { disabled: false })
  }

  /******************************/

  async getProfileUserService(
    credentials: AuthId
  ): Promise<AuthGetProfile>{
    const user = await this.authRepository.findOne({
      where: {
        id: credentials.id
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        role: true,
        disabled: true,
        banned: true,
      },
    })

    if (!user) throw new Error("User with this email doesn't exist")

    return user
  }

  /******************************/

  async deleteAccountSendLinkService(
    credentials: UserEmail
  ): Promise<void> {
    const existingUser = await this.authRepository.findOne({
      where: { email: credentials.email }
    })

    if (!existingUser) throw new Error("User with this email doesn't exist")

    await this.emailService.sendDeleteAccountLinkMail(credentials.email)
  }

  async deleteAccountService(
    credentials: DeleteAccountCredentials
  ): Promise < void> {
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
    if (user.deleteAt) throw new Error("this user is already deleted")
    
    const matchedPasswords = await bcrypt.compare(credentials.password, user.password)
    
    if (!matchedPasswords) throw new Error("Incorrect password")
    
    await this.authRepository.update({
      email: credentials.email
    }, {
      deleteAt: new Date()
    })
  }
}