using Api_Trab.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

namespace Api_Trab.Servicios
{
    public class TrabajadoresService: ITrabajadoresServices
    {
        private readonly BdTrabajadorContext _context;
        private readonly DbSet<Trabajador> _dbSet;
        public TrabajadoresService(BdTrabajadorContext context) 
        {
            _context = context;
            _dbSet = _context.Set<Trabajador>();
        }
        public async Task<int> AddUser(Trabajador modelo, IFormFile foto)
        {
            // Guardar la imagen en la carpeta wwwroot/images
            string fotoPath = null;
            if (foto != null)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(foto.FileName);
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await foto.CopyToAsync(fileStream);
                }

                fotoPath = "/images/" + uniqueFileName; // ruta relativa
            }

            // Insertar en la base de datos usando la ruta
            int filasAfectadas = await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_AddTrabajador @Nombres={0}, @Apellidos={1}, @Tipo_documento={2}, @Numero_documento={3}, @Sexo={4}, @Fecha_nacimiento={5}, @FotoPath={6}, @Direccion={7}",
                modelo.Nombres,
                modelo.Apellidos,
                modelo.TipoDocumento,
                modelo.NumeroDocumento,
                modelo.Sexo,
                modelo.FechaNacimiento,
                fotoPath ?? "",
                modelo.Direccion ?? ""
            );

            return filasAfectadas;
        }

        public async Task<List<Trabajador>> AllUsers()
        {
            var lista = await _context.Trabajadores
                    .FromSqlRaw("EXEC sp_GetAllTrabajadores")
                    .ToListAsync();

            return lista;
        }
        public async Task<Trabajador?> GetUserById(int id)
        {
            var trabajador = await _context.Trabajadores
                    .FromSqlRaw("EXEC sp_GetTrabajadorById @Personid={0}", id)
                    .ToListAsync();

            return trabajador.FirstOrDefault();
        }
        public async Task<int> DeleteUser(int id)
        {
            int trabajador = await _context.Database.ExecuteSqlRawAsync(
                   "EXEC sp_DeleteTrabajador @Personid={0}", id
               ); 
          
            return trabajador;
        }
        public async Task<int> UpdateUser(Trabajador modelo)
        {
            

            int filasAfectadas = await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_UpdateTrabajador @Personid={0}, @Nombres={1}, @Apellidos={2}, @Tipo_documento={3}, @Numero_documento={4}, @Sexo={5}, @Fecha_nacimiento={6}, @Foto={7}, @Direccion={8}",
                modelo.Personid,
                modelo.Nombres,
                modelo.Apellidos,
                modelo.TipoDocumento,
                modelo.NumeroDocumento,
                modelo.Sexo,
                modelo.FechaNacimiento,
              
                modelo.Direccion ??""
            );

            return filasAfectadas; // devuelve 0 si no se actualizó
        }
    }
}
