# Build stage
FROM node:18-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Serve stage
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install serve
RUN npm install -g serve

# Copy built files
COPY --from=build /usr/src/app/build ./build

# Expose port
EXPOSE 3001

# Start serve
CMD ["serve", "-s", "build", "-l", "3000"]