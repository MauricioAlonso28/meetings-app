import { Professional } from "@/database/entities/professional.entity";
import { User } from "@/database/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProfessionalCredentials, GetProfessionalProfile, ProfessionalProfileCredentials } from "../constants/professional.constant";

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>
  ) { }
  
  async postProfessionalService(
    credentials: CreateProfessionalCredentials
  ): Promise<void> {
    const professionalFound = await this.professionalRepository.findOne({
      where: { 
        userId: credentials.userId
      },
    })

    if (professionalFound) throw new Error("Professional with this id already exists")
    
    const professional = this.professionalRepository.create({
      userId: credentials.userId,
      age: credentials.age,
      description: credentials.description,
      image: credentials.image,
      specialization: credentials.specialization,
      nationality: credentials.nationality
    })

    await this.professionalRepository.save(professional)
  }

  async getProfessionalProfileService(
    credentials: ProfessionalProfileCredentials
  ): Promise<GetProfessionalProfile> {    
    const professionalFound = await this.professionalRepository.findOne({
      where: { 
        userId: credentials.userId
      },
      select: [
        "age",
        "description",
        "image",
        "nationality",
        "specialization",
        "visibility"
      ]
    })

    if (!professionalFound) throw new Error("Professional with this id doesn't exist")
    
    return professionalFound
  }

  async updateProfessionalProfileService(
    credentials: CreateProfessionalCredentials
  ): Promise<void> {
    const professionalFound = await this.professionalRepository.findOneBy({
      userId: credentials.userId
    })

    if (!professionalFound) throw new Error("Professional with this id doesn't exist!")

    await this.professionalRepository.update({
      userId: credentials.userId
    }, {
      age: credentials.age,
      description: credentials.description,
      image: credentials.image,
      nationality: credentials.nationality,
      specialization: credentials.specialization
    })
  }
}