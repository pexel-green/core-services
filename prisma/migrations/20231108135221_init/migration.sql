-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContainerType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ContainerType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Container" (
    "id" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,
    "containerTypeId" TEXT NOT NULL,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blob" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 1,
    "size" INTEGER NOT NULL,
    "containerId" TEXT NOT NULL,

    CONSTRAINT "Blob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_containerTypeId_fkey" FOREIGN KEY ("containerTypeId") REFERENCES "ContainerType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blob" ADD CONSTRAINT "Blob_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "Container"("id") ON DELETE CASCADE ON UPDATE CASCADE;
