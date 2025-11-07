using System;
using System.Collections.Generic;

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

    public string? Foto{ get; set; }

    public string? Direccion { get; set; }
}
