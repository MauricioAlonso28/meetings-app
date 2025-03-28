import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { ServiceService } from "../services/service.service";
import { ExtendedRequest } from "../constants/config.interface";
import { Response } from 'express'
import { handleError } from "../utils/error-handler.util";
import { CreateServiceDto } from "../DTOs/service.dto";

@Controller('service')
export class ServiceController { 
  constructor(
    private readonly serviceService: ServiceService
  ) { }

  @Post('create')
  async createService(
    @Req() req: ExtendedRequest,
    @Res() res: Response,
    @Body() body: CreateServiceDto
  ) {
    try {
      await this.serviceService.createServiceService({
        userId: req.user.sub,
        ...body
      })

      return res.send({
        message: 'Service created successfully',
      })
    } catch (error) {
      handleError(error, res)
    }
  }
}