export interface CreateProfessionalCredentials {
  userId: string
  name: string
  lastname: string
  age: Date
  description?: string
  image?: string
  specialization?: string
  nationality?: string 
}

export interface UpdateProfessionalCredentials extends Omit<
  CreateProfessionalCredentials, "age"
>{ }

export interface ProfessionalProfileCredentials extends Pick<CreateProfessionalCredentials, 'userId' > {}

export interface GetProfessionalProfile extends Omit<CreateProfessionalCredentials, 'userId'>{ }

export interface GetAllProfessionalsProfile {
  name: string
  lastname: string
  age: Date
  image: string
  nationality: string
  specialization: string
}

export interface FilterProfessionalsPageLimit {
  page: number
  limit: number
  specialization?: string
}
