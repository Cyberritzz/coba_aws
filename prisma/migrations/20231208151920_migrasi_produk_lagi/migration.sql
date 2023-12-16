/*
  Warnings:

  - You are about to alter the column `type_product` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `category` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `type_product` ENUM('premium', 'free') NOT NULL,
    MODIFY `category` ENUM('templates', 'web_design_figma', 'mobile_design_figma') NOT NULL;
