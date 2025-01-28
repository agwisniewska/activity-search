#!/bin/sh

npx prisma migrate deploy 

# Run the database initialization script
echo "Running database initialization..."
npm i --save-dev @types/node
npx ts-node src/init-db.ts

# Start the main application
echo "Starting the app..."
npm run dev