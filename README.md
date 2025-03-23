# API Endpoints

## AUTH
| Methods | Routes                     | Description                  | Status |
|---------|----------------------------|------------------------------|--------|
| POST    | /auth/sign-up              | Sign up                      | Done   |  
| POST    | /auth/sign-in              | Sign in                      | Done   |
| POST    | /auth/sign-out             | Sign out                     | Done   |
| PUT     | /auth/forgot-password      | Link to reset password       | Done   |
| PUT     | /auth/reset-password       | Reset password               | Done   |
| PUT     | /auth/update-password/:id  | Update current password      | Done   |
| PUT     | /auth/disable-profile      | Disable account              | Done   |
| PUT     | /auth/enable-profile       | Enable account               | Done   |
| GET     | /auth/profile/:email       | Get user profile             | Done   |
| POST    | /auth/delete-account-link  | Link to remove account       | Done   |
| DELETE  | /auth/delete-account       | Delete Account               | Done   |

## PROFESSIONAL
| Methods | Routes                           | Description                    | Status   |
|---------|----------------------------------|--------------------------------|----------|
| GET     | /professional/profile            | Get professional profile       | Done     |
| POST    | /professional/create             | Create a professional          | Done     |
| PUT     | /professional/update-profile     | Update professional data       | Done     |
| PUT     | /professional/enable-visibility  | Enable visibility to public    | Pendient |
| GET     | /professional/all                | Get all public professionals   | Pendient |
| GET     | /professional/professionals/:job | Get all professionals by job   | Pendient |

## CUSTOMERS
| Methods | Routes                          | Description                      | Status   |
|---------|---------------------------------|----------------------------------|----------|
| GET     | /customers/profile              | Get customer profile             | Pendient |
| GET     | /customers/all                  | Get all public customers         | Pendient |
| GET     | /customers/customers/:interest  | Get customer by interest         | Pendient | 
| POST    | /customers/create               | Create a customer                | Pendient |
| PUT     | /customers/update-profile       | Update customer data             | Pendient |
| PUT     | /customers/enable-visibility    | Enable visibility to public      | Pendient |

## BLOCKED USERS
| Methods | Routes                          | Description                      | Status   |
|---------|---------------------------------|----------------------------------|----------|
| GET     | /blocked-users/blocked-users    | Get all blocked users            | Pendient |
| GET     | /blocked-users/blocked-user/:id | Get blocked user by id           | Pendient |
| POST    | /blocked-users/block            | Block a user                     | Pendient |
| PUT     | /blocked-users/disblock         | Disblock a user                  | Pendient |

## FOLLOWS
| Methods | Routes                 | Description                               | Status   |
|---------|------------------------|-------------------------------------------|----------|
| GET     | /follows/follows?type  | Get all followers | following | requests  | Pendient |
| POST    | /follows/follow        | Request of follow to user                 | Pendient |
| DELETE  | /follows/unfollow      | Unfollow a user                           | Pendient |
| GET     | /follows/followers/:id | Get followers of a user                   | Pendient |

## SERVICES
| Methods | Routes                          | Description                             | Status   |
|---------|---------------------------------|-----------------------------------------|----------|
| GET     | /services/services              | Get all services                        | Pendient |
| GET     | /services/service/:id           | Get service by id                       | Pendient |
| GET     | /services/service?filter        | Get service by title | price | duration | Pendient |
| GET     | /services/service?status        | Get all disabled | enabled services     | Pendient |
| PUT     | /services/update-service        | Update service data                     | Pendient |
| PUT     | /services/enable-service        | Enable service                          | Pendient |
| PUT     | /services/disable-service       | Disable service                         | Pendient |
| POST    | /services/create                | Create a service                        | Pendient |
| DELETE  | /services/delete-service        | Delete service                          | Pendient |
