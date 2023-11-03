BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [type] INT NOT NULL CONSTRAINT [User_type_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[ContainerType] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ContainerType_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Container] (
    [id] NVARCHAR(1000) NOT NULL,
    [type] INT NOT NULL CONSTRAINT [Container_type_df] DEFAULT 1,
    [userId] NVARCHAR(1000) NOT NULL,
    [containerTypeId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Container_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Blob] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [extension] NVARCHAR(1000) NOT NULL,
    [type] INT NOT NULL CONSTRAINT [Blob_type_df] DEFAULT 1,
    [size] INT NOT NULL,
    [containerId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Blob_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Container] ADD CONSTRAINT [Container_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Container] ADD CONSTRAINT [Container_containerTypeId_fkey] FOREIGN KEY ([containerTypeId]) REFERENCES [dbo].[ContainerType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Blob] ADD CONSTRAINT [Blob_containerId_fkey] FOREIGN KEY ([containerId]) REFERENCES [dbo].[Container]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
