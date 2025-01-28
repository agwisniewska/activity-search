# Stage 1: Install dependencies
FROM node:20 AS builder
WORKDIR /app
COPY package.json ./
RUN rm -rf node_modules package-lock.json && npm install
RUN npm install @rollup/rollup-linux-arm64-gnu

# Stage 2: Copy dependencies and run the project
FROM node:20-slim
WORKDIR /app
COPY package.json ./
RUN rm -rf node_modules package-lock.json && npm install
RUN npm install @rollup/rollup-linux-arm64-gnu
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["npm", "run", "dev"]
EXPOSE 8080