using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    public partial class AddTechTrendsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TechTrends",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Technology = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Publications = table.Column<int>(type: "int", nullable: false),
                    MarketSizeBillionUsd = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    AdoptionRate = table.Column<decimal>(type: "decimal(5,2)", nullable: false),
                    SearchTrendIndex = table.Column<int>(type: "int", nullable: false),
                    NumberOfStartups = table.Column<int>(type: "int", nullable: false),
                    InvestmentBillionUsd = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    JobPostings = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TechTrends", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TechTrends");
        }
    }
}
