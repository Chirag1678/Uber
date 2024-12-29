# Backend API Documentation

# Users Endpoints

## Endpoint: `/users/register`

### Method: POST

### Description
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password. The password will be hashed before storing it in the database. Upon successful registration, a JSON Web Token (JWT) is generated and returned along with the user details.

### Request Body
The request body should be in JSON format and include the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required): The first name of the user. Must be at least 3 characters long.
  - `lastname` (string, optional): The last name of the user. If provided, must be at least 3 characters long.
- `email` (string, required): The email address of the user. Must be a valid email format and at least 5 characters long.
- `password` (string, required): The password for the user account. Must be at least 5 characters long.

### Response

#### Success (201 Created)
- **Status Code**: 201
- **Response Body**: A JSON object containing:
  - `token`: The JWT for the authenticated session.
  - `user`: An object with the user's details (excluding the password).

#### Error (400 Bad Request)
- **Status Code**: 400
- **Response Body**: A JSON object containing:
  - `errors`: An array of error messages indicating validation failures.

### Validation Rules
- Email must be:
  - Valid email format
  - At least 5 characters long
  - Will be normalized to standard format
- First name must be:
  - Required
  - At least 3 characters long
  - Will be trimmed of whitespace
- Last name (optional):
  - If provided, must be at least 3 characters long
  - Will be trimmed of whitespace
- Password must be:
  - At least 5 characters long
  - Cannot contain whitespace characters

## Endpoint: `/users/login`

### Method: POST

### Description
This endpoint authenticates an existing user using their email and password. Upon successful authentication, a JSON Web Token (JWT) is generated and returned along with the user details.

### Request Body
The request body should be in JSON format and include the following fields:

- `email` (string, required): The email address of the registered user. Must be a valid email format and at least 5 characters long.
- `password` (string, required): The password for the user account. Must be at least 5 characters long.

### Response

#### Success (200 OK)
- **Status Code**: 200
- **Response Body**: A JSON object containing:
  - `token`: The JWT for the authenticated session.
  - `user`: An object with the user's details (excluding the password).

#### Error (401 Unauthorized)
- **Status Code**: 401
- **Response Body**: A JSON object containing:
  - `message`: Error message indicating invalid credentials.

#### Error (400 Bad Request)
- **Status Code**: 400
- **Response Body**: A JSON object containing:
  - `errors`: An array of error messages indicating validation failures.

### Validation Rules
- Email must be:
  - Valid email format
  - At least 5 characters long
- Password must be:
  - At least 5 characters long

## Endpoint: `/users/profile`

### Method: GET

### Description
This endpoint retrieves the profile information of the currently authenticated user. It requires a valid JWT token to be provided either in the cookies or Authorization header.

### Authentication
Requires a valid JWT token in one of:
- Cookie: `token`
- Authorization Header: `Bearer <token>`

### Response

#### Success (200 OK)
- **Status Code**: 200
- **Response Body**: A JSON object containing:
  - `user`: An object with the user's details (excluding the password)

#### Error (401 Unauthorized)
- **Status Code**: 401
- **Response Body**: A JSON object containing:
  - `message`: "Unauthorized"

## Endpoint: `/users/logout`

### Method: GET

### Description
This endpoint logs out the current user by invalidating their JWT token. The token is added to a blacklist and the cookie is cleared if present.

### Authentication
Requires a valid JWT token in one of:
- Cookie: `token`
- Authorization Header: `Bearer <token>`

### Response

#### Success (200 OK)
- **Status Code**: 200
- **Response Body**: A JSON object containing:
  - `message`: "Logged out successfully"

#### Error (401 Unauthorized)
- **Status Code**: 401
- **Response Body**: A JSON object containing:
  - `message`: "Unauthorized"

# Captains Endpoints

## Endpoint: `/captains/register`

### Method: POST

### Description
This endpoint is used to register a new captain. It requires the captain's personal information, vehicle details, and authentication credentials. The password will be hashed before storing it in the database. Upon successful registration, a JSON Web Token (JWT) is generated and returned along with the captain details.

### Request Body
The request body should be in JSON format and include the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required): The first name of the captain. Must be at least 3 characters long.
  - `lastname` (string, required): The last name of the captain. Must be at least 3 characters long.
- `email` (string, required): The email address of the captain. Must be a valid email format and at least 5 characters long.
- `password` (string, required): The password for the captain account. Must be at least 5 characters long.
- `vehicle`: An object containing:
  - `color` (string, required): The color of the vehicle. Must be at least 3 characters long.
  - `plate` (string, required): The license plate number. Must be at least 3 characters long.
  - `capacity` (number, required): The passenger capacity of the vehicle. Must be at least 1.
  - `vehicleType` (string, required): The type of vehicle. Must be one of: 'car', 'motorcycle', 'auto'.

### Response

#### Success (201 Created)
- **Status Code**: 201
- **Response Body**: A JSON object containing:
  - `token`: The JWT for the authenticated session.
  - `captain`: An object with the captain's details (excluding the password), including:
    - `fullname`: Object containing firstname and lastname
    - `email`: Captain's email address
    - `vehicle`: Object containing vehicle details
    - `status`: Captain's current status (defaults to 'inactive')
    - `location`: Object containing lat and lng coordinates (if available)

#### Error (400 Bad Request)
- **Status Code**: 400
- **Response Body**: A JSON object containing either:
  - `errors`: An array of validation error messages
  - `message`: "Captain already exists" (if email is already registered)

### Validation Rules
- Email must be valid and at least 5 characters long
- First name must be at least 3 characters long
- Password must be at least 5 characters long
- Vehicle color must be at least 3 characters long
- Vehicle plate must be at least 3 characters long
- Vehicle capacity must be at least 1
- Vehicle type must be one of: 'car', 'motorcycle', 'auto'

## Endpoint: `/captains/login`

### Method: POST

### Description
This endpoint authenticates an existing captain using their email and password. Upon successful authentication, a JSON Web Token (JWT) is generated and returned along with the captain details.

### Request Body
The request body should be in JSON format and include the following fields:

- `email` (string, required): The email address of the registered captain. Must be a valid email format and at least 5 characters long.
- `password` (string, required): The password for the captain account. Must be at least 5 characters long.

### Response

#### Success (200 OK)
- **Status Code**: 200
- **Response Body**: A JSON object containing:
  - `token`: The JWT for the authenticated session.
  - `captain`: An object with the captain's details (excluding the password), including:
    - `fullname`: Object containing firstname and lastname
    - `email`: Captain's email address
    - `vehicle`: Object containing vehicle details
    - `status`: Captain's current status
    - `location`: Object containing lat and lng coordinates (if available)

#### Error (401 Unauthorized)
- **Status Code**: 401
- **Response Body**: A JSON object containing:
  - `message`: "Invalid email or password"

#### Error (400 Bad Request)
- **Status Code**: 400
- **Response Body**: A JSON object containing:
  - `errors`: An array of error messages indicating validation failures.

## Endpoint: `/captains/profile`

### Method: GET

### Description
This endpoint retrieves the profile information of the currently authenticated captain. It requires a valid JWT token to be provided either in the cookies or Authorization header.

### Authentication
Requires a valid JWT token in one of:
- Cookie: `token`
- Authorization Header: `Bearer <token>`

### Response

#### Success (200 OK)
- **Status Code**: 200
- **Response Body**: A JSON object containing:
  - `captain`: An object with the captain's details (excluding the password)

#### Error (401 Unauthorized)
- **Status Code**: 401
- **Response Body**: A JSON object containing:
  - `message`: "Unauthorized"

## Endpoint: `/captains/logout`

### Method: GET

### Description
This endpoint logs out the current captain by invalidating their JWT token. The token is added to a blacklist and the cookie is cleared if present.

### Authentication
Requires a valid JWT token in one of:
- Cookie: `token`
- Authorization Header: `Bearer <token>`

### Response

#### Success (200 OK)
- **Status Code**: 200
- **Response Body**: A JSON object containing:
  - `message`: "Logged out successfully"

#### Error (401 Unauthorized)
- **Status Code**: 401
- **Response Body**: A JSON object containing:
  - `message`: "Unauthorized"

# Maps Endpoints

## Endpoint: `/maps/get-coordinates`

### Method: GET

### Description
This endpoint retrieves the geographical coordinates (latitude and longitude) for a given address.

### Request Parameters
- `address` (string, required): The address for which to retrieve coordinates. Must be at least 3 characters long.

### Response

#### Success (200 OK)
- **Status Code**: 200
- **Response Body**: A JSON object containing:
  - `ltd`: Latitude of the address.
  - `lng`: Longitude of the address.

#### Error (400 Bad Request)
- **Status Code**: 400
- **Response Body**: A JSON object containing:
  - `errors`: An array of error messages indicating validation failures.

## Endpoint: `/maps/get-distance-time`

### Method: GET

### Description
This endpoint calculates the distance and estimated travel time between two locations.

### Request Parameters
- `origin` (string, required): The starting address. Must be at least 3 characters long.
- `destination` (string, required): The destination address. Must be at least 3 characters long.

### Response

#### Success (200 OK)
- **Status Code**: 200
- **Response Body**: A JSON object containing:
  - `distance`: The distance between the two locations.
  - `duration`: The estimated travel time.

#### Error (400 Bad Request)
- **Status Code**: 400
- **Response Body**: A JSON object containing:
  - `errors`: An array of error messages indicating validation failures.

## Endpoint: `/maps/get-suggestions`

### Method: GET

### Description
This endpoint provides autocomplete suggestions for a given input.

### Request Parameters
- `input` (string, required): The input string for which to get suggestions. Must be at least 3 characters long.

### Response

#### Success (200 OK)
- **Status Code**: 200
- **Response Body**: A JSON array containing suggestions.

#### Error (400 Bad Request)
- **Status Code**: 400
- **Response Body**: A JSON object containing:
  - `errors`: An array of error messages indicating validation failures.

# Rides Endpoints

## Endpoint: `/rides/create`

### Method: POST

### Description
This endpoint creates a new ride request.

### Request Body
The request body should be in JSON format and include the following fields:

- `pickup` (string, required): The pickup address. Must be at least 3 characters long.
- `destination` (string, required): The destination address. Must be at least 3 characters long.
- `vehicleType` (string, required): The type of vehicle for the ride. Must be one of: 'auto', 'car', 'moto'.

### Response

#### Success (201 Created)
- **Status Code**: 201
- **Response Body**: A JSON object containing:
  - `ride`: An object with the details of the created ride.

#### Error (400 Bad Request)
- **Status Code**: 400
- **Response Body**: A JSON object containing:
  - `errors`: An array of error messages indicating validation failures.

## Endpoint: `/rides/get-fare`

### Method: GET

### Description
This endpoint retrieves the estimated fare for a ride based on the pickup and destination addresses.

### Request Parameters
- `pickup` (string, required): The pickup address. Must be at least 3 characters long.
- `destination` (string, required): The destination address. Must be at least 3 characters long.

### Response

#### Success (200 OK)
- **Status Code**: 200
- **Response Body**: A JSON object containing:
  - `fares`: An object with fare estimates for different vehicle types.
  - `distance`: The distance between the pickup and destination in kilometers.
  - `duration`: The estimated travel time in minutes.

#### Error (400 Bad Request)
- **Status Code**: 400
- **Response Body**: A JSON object containing:
  - `errors`: An array of error messages indicating validation failures.