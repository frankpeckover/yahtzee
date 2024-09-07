USE [yahtzee_db]
GO

/****** Object:  Table [dbo].[games]    Script Date: 25/08/2024 4:20:31 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[games](
	[gameID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[numPlayers] [int] NULL,
	[status] [bit] NULL,
	[dateCreated] [datetime] NULL
) ON [PRIMARY]
GO