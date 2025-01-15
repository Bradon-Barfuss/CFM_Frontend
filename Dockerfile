# Step 1: Use Node.js to build the React app
FROM node:16-alpine as build

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the React app
RUN npm run build

# Step 2: Use NGINX to serve the static files
FROM nginx:alpine

# Copy build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
