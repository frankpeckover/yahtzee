USE [yahtzee_db]
GO

/****** Object:  Table [dbo].[scores]    Script Date: 25/08/2024 4:20:31 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[scores](
	[gameID] [int] NOT NULL,
	[username] [VarChar](64) NOT NULL,
	[ones] [int] NULL,
	[twos] [int] NULL,
	[threes] [int] NULL,
	[fours] [int] NULL,
	[fives] [int] NULL,
	[sixes] [int] NULL,
	[bonus] [bit] NULL,
	[topSubTotal] [int] NULL,
	[topTotal] [int] NULL,
	[threeKind] [int] NULL,
	[fourKind] [int] NULL,
	[fullHouse] [bit] NULL,
	[shortStraight] [bit] NULL,
	[longStraight] [bit] NULL,
	[yahtzee] [bit] NULL,
	[yahtzeeBonus] [bit] NULL,
	[chance] [int] NULL,
	[bottomTotal] [int] NULL,
	[grandTotal] [int] NULL,
	[datePlayed] [datetime] NULL,
	CONSTRAINT PK_Scores PRIMARY KEY (gameID, username),
	CONSTRAINT FK_Scores_Users FOREIGN KEY (username) REFERENCES [dbo].[users](username)
) ON [PRIMARY]
GO


