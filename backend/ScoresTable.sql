USE [yahtzee_db]
GO

/****** Object:  Table [dbo].[scores]    Script Date: 25/08/2024 4:20:31 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[scores](
	[scoreID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[gameID] [int] NOT NULL,
	[userID] [int] NULL,
	[playerName] [varchar](64) NULL,
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
	FOREIGN KEY (gameID) REFERENCES [dbo].[games](gameID),
    FOREIGN KEY (userID) REFERENCES [dbo].[users](userID)
) ON [PRIMARY]
GO