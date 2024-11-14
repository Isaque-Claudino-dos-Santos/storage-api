/*
  Warnings:

  - You are about to drop the column `LastName` on the `users` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `LastName`,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL;
