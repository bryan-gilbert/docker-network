FROM node:14

# Add package file
COPY package*.json ./

# Install deps
RUN npm i

# Copy source
COPY . .

# run a command that does not stop to keep the container alive.
CMD npm run start
