USE [yahtzee_db]
GO

/****** Object:  Table [dbo].[users]    Script Date: 25/08/2024 4:21:00 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[users](
	[userID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY, 
	[username] [varchar](64) UNIQUE NOT NULL,
	[password] [varchar](256) NOT NULL,
	[dateCreated] [datetime] NULL
) ON [PRIMARY]
GO

INSERT into [dbo].users (Username, Password
) Values (
	'Guest', HASHBYTES('SHA2_256', 'guestpassword')
)


