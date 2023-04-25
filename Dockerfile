# Use an official Node.js runtime as a parent image
FROM node:16.16.0

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install Angular CLI
RUN npm install -g @angular/cli@14.2.6

# Install app dependencies
RUN npm install

# Build the app
RUN ng build --configuration=production

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["ng", "serve", "--host", "0.0.0.0"]
