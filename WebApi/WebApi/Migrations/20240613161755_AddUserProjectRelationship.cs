using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    public partial class AddUserProjectRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Projects",
                newName: "Project_Id");

            migrationBuilder.AddColumn<int>(
                name: "User_Id",
                table: "Projects",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_User_Id",
                table: "Projects",
                column: "User_Id",
                unique: true,
                filter: "[User_Id] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Users_User_Id",
                table: "Projects",
                column: "User_Id",
                principalTable: "Users",
                principalColumn: "User_Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Users_User_Id",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_User_Id",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "User_Id",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "Project_Id",
                table: "Projects",
                newName: "Id");
        }
    }
}
