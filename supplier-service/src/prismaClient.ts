import { PrismaClient } from "@prisma/client";

type Supplier = {
  name: string;
  address: string;
  zip: string;
  city: string
  country: string
};

const prisma = new PrismaClient();

export async function getSupplier(id: number) {
  return await prisma.supplier.findUnique({
    where: {
      id: Number(id),
    },
  });
}

export async function createSupplier(newSupplier: Supplier) {
  try {
    await prisma.supplier.create({
      data: newSupplier,
    });

    console.log("Supplier created successfully:", newSupplier);
  } catch (error) {
    console.error("Error creating activity:", error);
  } finally {
    await prisma.$disconnect();
  }
}
