using Api_Trab.Models;
using Api_Trab.Servicios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api_Trab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrabajadorController : ControllerBase
    {
        private readonly ITrabajadoresServices _service;
        public TrabajadorController(ITrabajadoresServices service)
        {
            _service = service;
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> ListarUsuarios()
        {
            var usuario = await _service.AllUsers();
            return Ok(usuario);
         
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Trabajador>> GetTrabajador(int id)
        {
            var trabajador = await _service.GetUserById(id);

            if (trabajador == null)
            {
                return NotFound(new { message = "No se encontró el trabajador con ese ID"  });
            }

            return Ok(trabajador);
        }
        [HttpPost]
        [Route("Agregar")]
        public async Task<IActionResult> Agregar([FromBody] Trabajador modelo, IFormFile foto)
        {
            if (foto != null)
            {
                // Carpeta donde se guardarán las imágenes
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // Crear un nombre único para el archivo
                var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(foto.FileName);
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await foto.CopyToAsync(fileStream);
                }

                // Guardamos la ruta relativa en el modelo
                modelo.Foto = "/images/" + uniqueFileName;
            }

            var filas = await _service.AddUser(modelo, foto); // ✔ ahora pasamos ambos
            return Ok(new { success = true, filas });

        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Modificar(int id, [FromBody] Trabajador modelo)
        {
            if (id != modelo.Personid) // Validar que el id coincida
            {
                return BadRequest(new { success = false, message = "El ID no coincide con el trabajador" });
            }

            var filas = await _service.UpdateUser(modelo);

            return Ok(new
            {
                success = true,
                message = "Trabajador editado con éxito ✅",
                filasAfectadas = filas,
                data = modelo
            });
        }
        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var filas = await _service.DeleteUser(id);
            if (filas == 0)
                return NotFound(new { message = "Trabajador no encontrado" });
            return Ok(new { message = "Trabajador eliminado con éxito" });

        }
    }
}
