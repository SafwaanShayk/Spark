using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebApi.Models
{
    public partial class SparkdbContext : DbContext
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
           

            modelBuilder.Entity<Project>(entity =>
            {
                entity.HasNoKey();

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
