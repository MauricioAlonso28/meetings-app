import { HttpStatus, NestMiddleware } from "@nestjs/common";
import { ExtendedRequest } from "@/api/constants/config.interface";
import { NextFunction, Response } from 'express'
import { JwtService } from "@nestjs/jwt";
import { DEFAULT_KEY } from "../utils/default-key";

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

export class AuthNotLoggedInMiddleware implements NestMiddleware {
  use(
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

    const jwtService = new JwtService()
  
    try {
      const user = jwtService.verifyAsync(token,
        { secret: DEFAULT_KEY }
      );
      console.log("user")
      console.log(user)
      req.user = user; 
      next(); 
    } catch (err) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: "Invalid token",
      });
    }
  }
}