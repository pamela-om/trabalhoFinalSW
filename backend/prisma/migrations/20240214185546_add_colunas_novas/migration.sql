/*
  Warnings:

  - You are about to drop the column `editora` on the `livros` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `clientes` ADD COLUMN `senha` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `livros` DROP COLUMN `editora`,
    ADD COLUMN `genero` VARCHAR(191) NULL,
    ADD COLUMN `imagem` VARCHAR(191) NULL;
