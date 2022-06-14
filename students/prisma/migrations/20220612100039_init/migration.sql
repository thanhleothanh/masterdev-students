/*
  Warnings:

  - The primary key for the `diemsotuyen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `diemsotuyen` table. All the data in the column will be lost.
  - You are about to drop the column `diemsotuyenId` on the `hocsinh` table. All the data in the column will be lost.
  - You are about to drop the column `ngaysinhId` on the `hocsinh` table. All the data in the column will be lost.
  - The primary key for the `ngaysinh` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ngaysinh` table. All the data in the column will be lost.
  - Added the required column `hocsinhId` to the `diemsotuyen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hocsinhId` to the `ngaysinh` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `hocsinh` DROP FOREIGN KEY `hocsinh_diemsotuyenId_fkey`;

-- DropForeignKey
ALTER TABLE `hocsinh` DROP FOREIGN KEY `hocsinh_ngaysinhId_fkey`;

-- AlterTable
ALTER TABLE `diemsotuyen` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `hocsinhId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`hocsinhId`);

-- AlterTable
ALTER TABLE `hocsinh` DROP COLUMN `diemsotuyenId`,
    DROP COLUMN `ngaysinhId`;

-- AlterTable
ALTER TABLE `ngaysinh` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `hocsinhId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`hocsinhId`);

-- AddForeignKey
ALTER TABLE `diemsotuyen` ADD CONSTRAINT `diemsotuyen_hocsinhId_fkey` FOREIGN KEY (`hocsinhId`) REFERENCES `hocsinh`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ngaysinh` ADD CONSTRAINT `ngaysinh_hocsinhId_fkey` FOREIGN KEY (`hocsinhId`) REFERENCES `hocsinh`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
