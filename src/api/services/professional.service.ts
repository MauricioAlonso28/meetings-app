import { Professional } from "@/database/entities/professional.entity";
import { User } from "@/database/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProfessionalCredentials, FilterProfessionalsPageLimit, GetAllProfessionalsProfile, GetProfessionalProfile, ProfessionalProfileCredentials, UpdateProfessionalCredentials } from "../constants/professional.constant";
import { ProfessionalVisibility } from "@/database/enums/user.enum";

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
    
    const formattedAge = new Date(credentials.age).toISOString().split("T")[0]

    const professional = this.professionalRepository.create({
      userId: credentials.userId,
      name: credentials.name,
      lastname: credentials.lastname,
      age: formattedAge,
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
        "name",
        "lastname",
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

  async getAllProfessionalsService(
    credentials: FilterProfessionalsPageLimit
  ): Promise<GetAllProfessionalsProfile[]> {
    const offset = (credentials.page - 1) * credentials.limit
    const whereCondition: any = {
      visibility: ProfessionalVisibility.PUBLIC
    }

    if (credentials.specialization) {
      whereCondition.specialization = credentials.specialization
    }

    const professionalsFound = await this.professionalRepository.find({
      where: whereCondition,
      select: [
        "age",
        "image",
        "nationality",
        "specialization",
        "name",
        "lastname"
      ],
      skip: offset,
      take: credentials.limit
    })

    return professionalsFound
  }

  async updateProfessionalProfileService(
    credentials: UpdateProfessionalCredentials
  ): Promise<void> {
    const professionalFound = await this.professionalRepository.findOneBy({
      userId: credentials.userId
    })

    if (!professionalFound) throw new Error("Professional with this id doesn't exist!")

    await this.professionalRepository.update({
      userId: credentials.userId
    }, {
      description: credentials.description,
      image: credentials.image,
      nationality: credentials.nationality,
      specialization: credentials.specialization
    })
  }

  async enableVisibilityService(
    credentials: ProfessionalProfileCredentials
  ): Promise<string> {
    const professionalFound = await this.professionalRepository.findOne({
      where: {
        userId: credentials.userId
      },
      select: [
        "name",
        "lastname",
        "age",
        "description",
        "image",
        "nationality",
        "specialization",
        "visibility"
      ]
    })
    
    if (!professionalFound) throw new Error("Professional with this id doesn't exist!")
    if (professionalFound.visibility === ProfessionalVisibility.PUBLIC) throw new Error("This profile is already public")
    
    let existEmptyAttribute = false
    
    for (const [_, value] of Object.entries(professionalFound)) {
      if (!value) {
        existEmptyAttribute = true
        break
      }
    }

    if (existEmptyAttribute) throw new Error("You must fill all the fields to make your profile public")
    
    await this.professionalRepository.update({
      userId: credentials.userId
    }, {
      visibility: ProfessionalVisibility.PUBLIC
    })

    return `${professionalFound.name} ${professionalFound.lastname}`
  }
}