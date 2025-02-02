# Base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g @nestjs/cli
RUN npm install

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start:dev"]
