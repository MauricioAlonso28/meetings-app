import { Service } from "@/database/entities/service.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateServiceCredentials } from "../constants/service.constant";

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>
  ) { }
  
  async createServiceService(
    credentials: CreateServiceCredentials
  ): Promise<void> {
    const serviceCreated = this.serviceRepository.create({
      userId: credentials.userId,
      title: credentials.title,
      description: credentials.description,
      price: credentials.price,
      duration: credentials.duration
    })

    await this.serviceRepository.save(serviceCreated)
  }
}