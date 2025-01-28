# Stage 1: Install dependencies
FROM node:20 AS builder
WORKDIR /app
COPY package.json ./
RUN rm -rf node_modules && npm install

# Stage 2: Copy dependencies and run the project
FROM node:20-slim

WORKDIR /app
COPY package.json ./
RUN rm -rf node_modules && npm install
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]
