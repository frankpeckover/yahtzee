USE [yahtzee_db]
GO

/****** Object:  Table [dbo].[users]    Script Date: 25/08/2024 4:21:00 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[users](
	[username] [varchar](64) NOT NULL PRIMARY KEY,
	[password] [varchar](256) NOT NULL
) ON [PRIMARY]
GO

INSERT into [dbo].users (Username, Password
) Values (
	'Guest', HASHBYTES('SHA2_256', 'guestpassword')
)


