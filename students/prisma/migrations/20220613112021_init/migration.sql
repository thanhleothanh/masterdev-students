/*
  Warnings:

  - Added the required column `lop` to the `hocsinh` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hocsinh` ADD COLUMN `lop` VARCHAR(10) NOT NULL;
