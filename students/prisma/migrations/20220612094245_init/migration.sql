-- CreateTable
CREATE TABLE `hocsinh` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mahocsinh` VARCHAR(11) NOT NULL,
    `hovaten` VARCHAR(100) NOT NULL,
    `gioitinh` VARCHAR(3) NOT NULL,
    `dantoc` VARCHAR(20) NOT NULL,
    `hokhauthuongtru` VARCHAR(500) NOT NULL,
    `dienthoailienhe` VARCHAR(11) NOT NULL,
    `ghichu` VARCHAR(1000) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `noisinh` INTEGER NOT NULL,
    `quanhuyenId` INTEGER NOT NULL,
    `truongId` INTEGER NOT NULL,
    `diemsotuyenId` INTEGER NOT NULL,
    `ngaysinhId` INTEGER NOT NULL,

    UNIQUE INDEX `hocsinh_mahocsinh_key`(`mahocsinh`),
    UNIQUE INDEX `hocsinh_diemsotuyenId_key`(`diemsotuyenId`),
    UNIQUE INDEX `hocsinh_ngaysinhId_key`(`ngaysinhId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `thanhpho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenthanhpho` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quanhuyen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenquanhuyen` VARCHAR(100) NOT NULL,
    `thanhphoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `truong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tentruong` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diemsotuyen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tongdiemlop1` INTEGER NOT NULL,
    `tongdiemlop2` INTEGER NOT NULL,
    `tongdiemlop3` INTEGER NOT NULL,
    `tongdiemlop4` INTEGER NOT NULL,
    `tongdiemlop5` INTEGER NOT NULL,
    `tongdiem5nam` INTEGER NOT NULL,
    `diemuutien` INTEGER NULL,
    `tongdiemsotuyen` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ngaysinh` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngay` INTEGER NOT NULL,
    `thang` INTEGER NOT NULL,
    `nam` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hocsinh` ADD CONSTRAINT `hocsinh_noisinh_fkey` FOREIGN KEY (`noisinh`) REFERENCES `thanhpho`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hocsinh` ADD CONSTRAINT `hocsinh_quanhuyenId_fkey` FOREIGN KEY (`quanhuyenId`) REFERENCES `quanhuyen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hocsinh` ADD CONSTRAINT `hocsinh_truongId_fkey` FOREIGN KEY (`truongId`) REFERENCES `truong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hocsinh` ADD CONSTRAINT `hocsinh_diemsotuyenId_fkey` FOREIGN KEY (`diemsotuyenId`) REFERENCES `diemsotuyen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hocsinh` ADD CONSTRAINT `hocsinh_ngaysinhId_fkey` FOREIGN KEY (`ngaysinhId`) REFERENCES `ngaysinh`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quanhuyen` ADD CONSTRAINT `quanhuyen_thanhphoId_fkey` FOREIGN KEY (`thanhphoId`) REFERENCES `thanhpho`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
