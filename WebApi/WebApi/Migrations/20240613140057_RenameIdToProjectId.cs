using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    public partial class RenameIdToProjectId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.RenameColumn(
            name: "Id",
            table: "Projects",
            newName: "Project_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.RenameColumn(
             name: "Project_Id",
             table: "Projects",
             newName: "Id");
        }
    }
}
