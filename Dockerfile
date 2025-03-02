# Use the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to take advantage of Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the port used by NestJS (usually 3000)
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start"]