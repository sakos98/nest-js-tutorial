/*
  Warnings:

  - You are about to alter the column `updatedAt` on the `client` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(3)` to `Timestamp`.
  - You are about to alter the column `updatedAt` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(3)` to `Timestamp`.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `updatedAt` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(3)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `client` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `price` DOUBLE NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` TIMESTAMP NOT NULL;
