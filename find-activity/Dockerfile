# Stage 1: Install dependencies
FROM node:20 AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm install nuxt
RUN npm install @rollup/rollup-linux-arm64-gnu

# Stage 2: Copy dependencies and run the project
FROM node:20-slim
WORKDIR /app
COPY package.json ./

COPY --from=builder /app/node_modules ./node_modules
RUN npm install

COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev"]
