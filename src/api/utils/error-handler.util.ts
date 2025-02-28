import { HttpStatus } from "@nestjs/common";
import { Response } from "express";

export function handleError(
  error: any,
  res: Response
) {
  if (error instanceof Error) {
    return res.status(HttpStatus.CONFLICT).send({
      error: error.message,
    })
  } else {
    return res.status(HttpStatus.CONFLICT).send({
      error: 'An unknown error occurred',
    })
  }
}