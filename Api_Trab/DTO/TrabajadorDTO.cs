namespace Api_Trab.DTO
{
    public partial class TrabajadorDTO
    {
        public int? Personid { get; set; } // null cuando es nuevo
        public string Nombres { get; set; } = null!;
        public string Apellidos { get; set; } = null!;
        public string TipoDocumento { get; set; } = null!;
        public int NumeroDocumento { get; set; }
        public string Sexo { get; set; } = null!;
        public DateOnly FechaNacimiento { get; set; }
        public IFormFile? Foto { get; set; } // archivo que llega del frontend

        public string? Direccion { get; set; }

    }
}
