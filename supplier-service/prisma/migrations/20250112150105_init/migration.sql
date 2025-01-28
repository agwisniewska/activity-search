-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "zip" TEXT,
    "city" TEXT,
    "country" TEXT,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);
