using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebApi.Models
{
    public partial class SparkdbContext : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
    {
        public SparkdbContext()
        {
        }

        public SparkdbContext(DbContextOptions<SparkdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Project> Projects { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-J3ME1V2\\SQLEXPRESS;Database=Sparkdb;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure ApplicationUser table
            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                entity.ToTable("Users"); // Set the table name to 'Users'
                entity.HasKey(e => e.Id); // Set the primary key

                entity.Property(e => e.Id).HasColumnName("User_Id");

                entity.Property(e => e.UserName)
                    .HasColumnName("Username")
                    .HasMaxLength(255);

                entity.Property(e => e.PasswordHash)
                    .HasColumnName("Password");

                entity.Property(e => e.Email)
                    .HasMaxLength(255);
            });

            // Configure Identity-related tables
            modelBuilder.Entity<IdentityRole<int>>(b =>
            {
                b.HasKey(u => u.Id);
            });

            modelBuilder.Entity<IdentityUserRole<int>>(b =>
            {
                b.HasKey(ur => new { ur.UserId, ur.RoleId });
            });

            modelBuilder.Entity<IdentityUserClaim<int>>(b =>
            {
                b.HasKey(u => u.Id);
            });

            modelBuilder.Entity<IdentityUserLogin<int>>(b =>
            {
                b.HasKey(l => new { l.LoginProvider, l.ProviderKey });
            });

            modelBuilder.Entity<IdentityUserToken<int>>(b =>
            {
                b.HasKey(t => new { t.UserId, t.LoginProvider, t.Name });
            });

            modelBuilder.Entity<IdentityRoleClaim<int>>(b =>
            {
                b.HasKey(rc => rc.Id);
            });

            // Ensure Projects table is not recreated if it already exists
            modelBuilder.Entity<Project>(entity =>
            {
                entity.HasKey(e => e.Project_Id);
                entity.Property(e => e.Project_Id).ValueGeneratedOnAdd(); // Set up auto-generation for the Id

                // Configure the relationship
                entity.HasOne(d => d.User)
                    .WithOne(p => p.Project)
                    .HasForeignKey<Project>(d => d.User_Id)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.Property(e => e.Category).HasMaxLength(255);

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.Features).HasMaxLength(255);

                entity.Property(e => e.ProjectName)
                    .HasMaxLength(255)
                    .HasColumnName("Project Name");

                entity.Property(e => e.TechnologyStack)
                    .HasMaxLength(255)
                    .HasColumnName("Technology Stack");

                entity.Property(e => e.UserInterface).HasMaxLength(255);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
