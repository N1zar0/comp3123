# Use a base Node.js image
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to start the application
CMD ["node", "app.js"]  # Replace 'app.js' with your entry point file
