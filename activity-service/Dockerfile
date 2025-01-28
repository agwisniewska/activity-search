# Stage 1: Install dependencies
FROM node:20 AS builder
WORKDIR /app
COPY package.json ./
RUN npm install

# Stage 2: Copy dependencies and run the project
FROM node:20-slim

# Install OpenSSL and curl
RUN apt-get update && apt-get install -y openssl libssl-dev curl

WORKDIR /app
COPY package.json ./
RUN npm install
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
EXPOSE 4002
# CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
CMD ["sh", "start.sh"]
