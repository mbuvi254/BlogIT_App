BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] NVARCHAR(1000) NOT NULL,
    [firstName] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [emailAddress] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [isDeleted] BIT NOT NULL CONSTRAINT [users_isDeleted_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [users_emailAddress_key] UNIQUE NONCLUSTERED ([emailAddress]),
    CONSTRAINT [users_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[blogs] (
    [id] NVARCHAR(1000) NOT NULL,
    [authorId] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [synopsis] NVARCHAR(1000) NOT NULL,
    [featuredImageUrl] NVARCHAR(1000),
    [content] NVARCHAR(1000) NOT NULL,
    [isDeleted] BIT NOT NULL CONSTRAINT [blogs_isDeleted_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [blogs_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [lastUpdated] DATETIME2 NOT NULL,
    CONSTRAINT [blogs_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[blogs] ADD CONSTRAINT [blogs_authorId_fkey] FOREIGN KEY ([authorId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
