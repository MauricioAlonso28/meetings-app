# API Endpoints

## AUTH
| Methods | Routes                     | Description                  | Status |
|---------|----------------------------|------------------------------|--------|
| POST    | /auth/sign-up              | Sign Up                      | Done   |  
| POST    | /auth/sign-in              | Sign Up                      | Done   |
| POST    | /auth/sign-out             | Sign out                     | Done   |
| PUT     | /auth/forgot-password      | Link to reset password       | Done   |
| PUT     | /auth/reset-password       | Reset password               | Done   |
| PUT     | /auth/update-password/:id  | Update current password      | Done   |
| PUT     | /auth/update-complete-name | Update complete name         | Done   |
| PUT     | /auth/disable-profile      | Disable account              | Done   |
| PUT     | /auth/enable-profile       | Enable account               | Done   |
| GET     | /auth/profile/:email       | Get user profile             | Done   |
| DELETE  | /auth/delete-account-link  | Link to remove account       | Done   |
| DELETE  | /auth/delete-account       | Delete Account               | Done   |

## PROFESSIONAL
| Methods | Routes                          | Description                     | Status   |
|---------|---------------------------------|---------------------------------|----------|
| GET     | /professional/profile           | Get professional profile        | Done     |
| POST    | /professional/create            | Create a professional           | Done     |
| PUT     | /professional/update-profile    | Update professional data        | Done     |
| PUT     | /professional/enable-visibility | Enable visibility to public     | Pendient |
| GET     | /professional/professionals     | Get all professionals           | Pendient |

## SERVICES
| Methods | Routes                          | Description                      | Status   |
|---------|---------------------------------|----------------------------------|----------|
| GET     | /services/services              | Get all services                 | Pendient |
| GET     | /services/service/:id           | Get service by id                | Pendient |
| GET     | /services/service/:title        | Get service by title             | Pendient |
| GET     | /services/service-price         | Get all services by price        | Pendient |
| GET     | /services/service-duration      | Get all services by duration     | Pendient |
| GET     | /services/enable-services       | Get all enabled services         | Pendient |
| GET     | /services/disable-services      | Get all disabled services        | Pendient |
| POST    | /services/create                | Create a service                 | Pendient |
| PUT     | /services/update-service        | Update service data              | Pendient |
| PUT     | /services/enable-service        | Enable service                   | Pendient |
| PUT     | /services/disable-service       | Disable service                  | Pendient |
| DELETE  | /services/delete-service        | Delete service                   | Pendient |