using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace aspnetserver.Data.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    PostId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Content = table.Column<string>(type: "TEXT", maxLength: 100000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.PostId);
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "PostId", "Content", "Title" },
                values: new object[,]
                {
                    { 1, " Este es el post 1, contiene cosas interesantes.", "Post 1" },
                    { 2, " Este es el post 2, contiene cosas interesantes.", "Post 2" },
                    { 3, " Este es el post 3, contiene cosas interesantes.", "Post 3" },
                    { 4, " Este es el post 4, contiene cosas interesantes.", "Post 4" },
                    { 5, " Este es el post 5, contiene cosas interesantes.", "Post 5" },
                    { 6, " Este es el post 6, contiene cosas interesantes.", "Post 6" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Posts");
        }
    }
}
