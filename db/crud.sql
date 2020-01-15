SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[crud_employee](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NOT NULL,
	[address] [varchar](255) NULL,
	[department] [varchar](25) NULL,
	[city] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO



SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[crud_employees]
    @action             VARCHAR(10),
	@ID                 INT, 
	@name               VARCHAR(100),
	@address            VARCHAR(255),
	@department         VARCHAR(25),
	@city               VARCHAR(100)
	
AS
BEGIN
	SET NOCOUNT ON;

	IF @action = 'add' 
		INSERT INTO crud_employee
		(
	        [name],
	        [address],
	        department,
	        city
		)
		values
		(
	        @name,
	        @address,
	        @department,
	        @city
		)
	
	ELSE IF @action = 'edit' 
		UPDATE crud_employee
		SET
	        [name]      =   @name,
	        [address]   =   @address,
	        department  =   @department,
	        city        =   @city
		WHERE 
			ID = @ID; 
    ELSE
        DELETE FROM crud_employee WHERE ID = @ID

END 
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[crud_getEmployees]
  
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM crud_employee

END 
GO