/*
  Warnings:

  - You are about to drop the column `containerTypeId` on the `Container` table. All the data in the column will be lost.
  - You are about to drop the `ContainerType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Container` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Container" DROP CONSTRAINT "Container_containerTypeId_fkey";

-- AlterTable
ALTER TABLE "Container" DROP COLUMN "containerTypeId",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "ContainerType";
