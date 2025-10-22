/*
  Warnings:

  - You are about to drop the column `orderId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `line1` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingUGX` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalUGX` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_productId_fkey";

-- DropIndex
DROP INDEX "public"."Address_orderId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "orderId",
DROP COLUMN "street",
ADD COLUMN     "line1" TEXT NOT NULL,
ADD COLUMN     "line2" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "postal" TEXT,
ADD COLUMN     "region" TEXT,
ALTER COLUMN "country" SET DEFAULT 'UG';

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalAmount",
ADD COLUMN     "addressId" INTEGER,
ADD COLUMN     "pickup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shippingUGX" INTEGER NOT NULL,
ADD COLUMN     "totalUGX" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Image";

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "position" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "variantId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "priceUGX" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
