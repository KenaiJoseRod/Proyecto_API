using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Api_Trab.Models;

public partial class BdTrabajadorContext : DbContext
{
    public BdTrabajadorContext()
    {
    }

    public BdTrabajadorContext(DbContextOptions<BdTrabajadorContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Trabajador> Trabajadores { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){  }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Trabajador>(entity =>
        {
            entity.HasKey(e => e.Personid).HasName("PK__trabajad__AA2CFFDD154EEB23");

            entity.ToTable("trabajadores");

            entity.Property(e => e.Apellidos)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Direccion)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasDefaultValueSql("(NULL)");
            entity.Property(e => e.FechaNacimiento).HasColumnName("Fecha_nacimiento");
            entity.Property(e => e.Foto)
                  .HasMaxLength(255)
                  .IsUnicode(false)
                  .HasDefaultValue(null);
            entity.Property(e => e.Nombres)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.NumeroDocumento).HasColumnName("Numero_documento");
            entity.Property(e => e.Sexo)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.TipoDocumento)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Tipo_documento");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
