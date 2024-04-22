# Use the official Node.js 14 image as base
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install NestJS dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the NestJS application will run
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
