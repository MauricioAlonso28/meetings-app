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

export interface GetProfessionalProfile extends Omit<CreateProfessionalCredentials, 'userId' >{ }
