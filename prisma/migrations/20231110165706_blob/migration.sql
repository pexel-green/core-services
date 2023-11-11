/*
  Warnings:

  - You are about to drop the column `extension` on the `Blob` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Blob` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blob" DROP COLUMN "extension",
DROP COLUMN "size";
