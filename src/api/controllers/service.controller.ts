import { Controller } from "@nestjs/common";
import { ServiceService } from "../services/service.service";

@Controller('service')
export class ServiceController { 
  constructor(
    private readonly serviceService: ServiceService
  ) { }
}