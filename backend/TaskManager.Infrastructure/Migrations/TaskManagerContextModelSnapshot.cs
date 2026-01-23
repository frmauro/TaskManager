using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using TaskManager.Infrastructure.Data;

#nullable disable

namespace TaskManager.Infrastructure.Migrations
{
    /// <inheritdoc />
    [DbContext(typeof(AppDbContext))]
    public partial class TaskManagerContextModelSnapshot : ModelSnapshot
    {
        /// <inheritdoc />
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("TaskManager.Domain.Entities.TaskEntity", b =>
            {
                b.Property<Guid>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("char(36)");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("datetime(6)");

                b.Property<string>("Description")
                    .HasColumnType("longtext");

                b.Property<DateTime?>("DueDate")
                    .HasColumnType("datetime(6)");

                b.Property<bool>("IsCompleted")
                    .HasColumnType("tinyint(1)");

                b.Property<int>("Priority")
                    .HasColumnType("int");

                b.Property<string>("Title")
                    .IsRequired()
                    .HasColumnType("longtext");

                b.Property<DateTime?>("UpdatedAt")
                    .HasColumnType("datetime(6)");

                b.Property<Guid>("UserId")
                    .HasColumnType("char(36)");

                b.HasKey("Id");

                b.HasIndex("UserId");

                b.ToTable("Tasks");
            });

            modelBuilder.Entity("TaskManager.Domain.Entities.User", b =>
            {
                b.Property<Guid>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("char(36)");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("datetime(6)");

                b.Property<string>("Email")
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                b.Property<bool>("IsActive")
                    .HasColumnType("tinyint(1)");

                b.Property<string>("Name")
                    .IsRequired()
                    .HasColumnType("longtext");

                b.Property<string>("PasswordHash")
                    .IsRequired()
                    .HasColumnType("longtext");

                b.Property<int>("Role")
                    .HasColumnType("int");

                b.Property<DateTime?>("UpdatedAt")
                    .HasColumnType("datetime(6)");

                b.HasKey("Id");

                b.HasIndex("Email")
                    .IsUnique();

                b.ToTable("Users");
            });

            modelBuilder.Entity("TaskManager.Domain.Entities.TaskEntity", b =>
            {
                b.HasOne("TaskManager.Domain.Entities.User", "User")
                    .WithMany("Tasks")
                    .HasForeignKey("UserId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("User");
            });

            modelBuilder.Entity("TaskManager.Domain.Entities.User", b =>
            {
                b.Navigation("Tasks");
            });
        }
    }
}