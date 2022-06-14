-- DropForeignKey
ALTER TABLE `diemsotuyen` DROP FOREIGN KEY `diemsotuyen_hocsinhId_fkey`;

-- DropForeignKey
ALTER TABLE `ngaysinh` DROP FOREIGN KEY `ngaysinh_hocsinhId_fkey`;

-- AddForeignKey
ALTER TABLE `diemsotuyen` ADD CONSTRAINT `diemsotuyen_hocsinhId_fkey` FOREIGN KEY (`hocsinhId`) REFERENCES `hocsinh`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ngaysinh` ADD CONSTRAINT `ngaysinh_hocsinhId_fkey` FOREIGN KEY (`hocsinhId`) REFERENCES `hocsinh`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
