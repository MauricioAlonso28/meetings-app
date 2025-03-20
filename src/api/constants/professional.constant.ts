export interface CreateProfessionalCredentials {
  userId: string
  age?: Date
  description?: string
  image?: string
  specialization?: string
  nationality?: string 
}

export interface ProfessionalProfileCredentials extends Pick<CreateProfessionalCredentials, 'userId' > {}

export interface GetProfessionalProfile extends Omit<CreateProfessionalCredentials, 'userId' >{ }
