# server/Dockerfile
FROM node:18-alpine

# Create and set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json first for better caching
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the server code
COPY . /app

# Expose the port on which your server runs
EXPOSE 5000


# Start the application 
CMD ["npm", "run", "start"]
