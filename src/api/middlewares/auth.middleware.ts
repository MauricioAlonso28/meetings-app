import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { ExtendedRequest } from "@/api/constants/config.interface";
import { NextFunction, Response } from 'express'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@/database/entities/user.entity";
import { Repository } from "typeorm";

export class AuthLoggedInMiddleware implements NestMiddleware {
  use(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { token } = req.cookies

    if (token) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: 'Unauthorized: There is a user already logged in',
      })
    }

    next()
  }
}

@Injectable()
export class AuthNotLoggedInMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async use(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const { token } = req.cookies

    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: 'Unauthorized: You are not logged in',
      })
    }
  
    try {
      const user = await this.jwtService.verifyAsync(token,
        { secret: this.configService.get<string>('JWT_VERIFICATION_TOKEN_SECRET') }
      );

      req.user = user; 
      next(); 
    } catch (err) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: "Invalid token",
      });
    }
  }
}

@Injectable()
export class BannedUserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  
  async use(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { sub } = req.user
     
      const user = await this.userRepository.findOne({
        where: { id: sub },
        select: {
          banned: true,
        }
      });

      if (user?.banned) {
        return res.status(HttpStatus.FORBIDDEN).send({
          message: "You are banned from this application",
        })
      }

      next()
    } catch (error) {
      return res.send({
        message: `Error checking user status: ${error}`,
      })
    }
  }
}