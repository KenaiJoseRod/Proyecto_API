using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Trab.Models;

public partial class Trabajador
{
    public int Personid { get; set; }

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public string TipoDocumento { get; set; } = null!;

    public int NumeroDocumento { get; set; }

    public string Sexo { get; set; } = null!;

    public DateOnly FechaNacimiento { get; set; }

    public string? Direccion { get; set; }

    [NotMapped]
    public IFormFile Archivo { get; set; } // Ignorado por EF Core

    public string Foto { get; set; } // Aquí guardas la ruta del archivo en la DB
}
