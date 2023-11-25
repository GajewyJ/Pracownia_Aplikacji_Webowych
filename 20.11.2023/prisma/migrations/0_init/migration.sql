-- CreateTable
CREATE TABLE `adresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adress` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand` TEXT NULL,
    `model` TEXT NULL,
    `productionYear` INTEGER NULL,
    `registrationNumber` TEXT NULL,
    `dealer` INTEGER NULL,

    INDEX `dealer`(`dealer`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dealers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NULL,
    `adress` INTEGER NULL,

    INDEX `adress`(`adress`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client` INTEGER NULL,
    `price` DOUBLE NULL,
    `dealer` INTEGER NULL,

    INDEX `dealer`(`dealer`),
    INDEX `client`(`client`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testdrives` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientsId` INTEGER NULL,
    `carsId` INTEGER NULL,
    `drivesDate` DATE NULL,

    INDEX `carsId`(`carsId`),
    INDEX `clientsId`(`clientsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`dealer`) REFERENCES `dealers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `dealers` ADD CONSTRAINT `dealers_ibfk_1` FOREIGN KEY (`adress`) REFERENCES `adresses`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`dealer`) REFERENCES `dealers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`client`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `testdrives` ADD CONSTRAINT `testdrives_ibfk_1` FOREIGN KEY (`clientsId`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `testdrives` ADD CONSTRAINT `testdrives_ibfk_2` FOREIGN KEY (`carsId`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

