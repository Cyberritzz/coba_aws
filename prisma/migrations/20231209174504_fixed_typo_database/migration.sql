/*
  Warnings:

  - You are about to drop the column `fullName` on the `user` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `fullName`,
    ADD COLUMN `fullname` VARCHAR(191) NOT NULL;
