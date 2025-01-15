# Step 1: Use Node.js to build the React app
FROM node:16-alpine as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files and build the React app
COPY . .
RUN npm run build

# Step 2: Use NGINX to serve the static files
FROM nginx:alpine

# Copy build files to NGINX's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
