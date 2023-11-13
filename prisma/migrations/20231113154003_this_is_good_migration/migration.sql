/*
  Warnings:

  - You are about to alter the column `updatedAt` on the `client` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updatedAt` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updatedAt` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `client` MODIFY `updatedAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `updatedAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `updatedAt` TIMESTAMP NOT NULL;
