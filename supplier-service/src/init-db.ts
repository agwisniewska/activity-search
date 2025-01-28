import { suppliers } from "./data";
import { createSupplier } from "./prismaClient";


import * as fs from 'fs';
import * as path from 'path';

const initializedFilePath = path.join(__dirname, 'initialized');

async function initDatabase() {

  try {
    if (fs.existsSync(initializedFilePath)) {
      console.log("Database is already initialized. Skipping...");
      
      return;
    }

    console.log("Seeding data...");

    for (const supplier of suppliers) {
      await createSupplier(supplier);
    }

    console.log("Data seeded successfully.");
    fs.writeFileSync(initializedFilePath, 'Initialization completed.');
    console.log("Initialization file created.");

    process.exit(0);
    
  } catch (error) {
    console.error("An error occurred during initialization:", error);
    process.exit(1); // Exit with an error code
  }
}
  
  // Run the script
initDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
   