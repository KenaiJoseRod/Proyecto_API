using Api_Trab.DTO;
using Api_Trab.Models;
using Api_Trab.Servicios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Api_Trab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrabajadorController : ControllerBase
    {
        private readonly ITrabajadoresServices _service;
        private readonly string _rutaServidor;

        public TrabajadorController(ITrabajadoresServices service, IWebHostEnvironment env)
        {
            _service = service;
            _rutaServidor = Path.Combine(env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "uploads");

            if (!Directory.Exists(_rutaServidor))
                Directory.CreateDirectory(_rutaServidor);
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
        /*[HttpPost]
        [Route("Agregar")]
         public async Task<IActionResult> Agregar([FromBody] Trabajador modelo)
         {
             var filas = await _service.AddUser(modelo);
             // Asumiendo que modelo. Id se llena tras SaveChangesAsync()

             return Ok(new
             {
                 success = true,
                 message = "Trabajador editado con éxito ✅",
                 filasAfectadas = filas,
                 data = modelo
             });

         }*/
        [HttpPost]
        [Route("Agregar")]
        public async Task<IActionResult> Agregar([FromForm] Trabajador modelo)
        {
            try
            {
                if (modelo.Archivo != null && modelo.Archivo.Length > 0)
                {
                    string archivoNombre = Path.GetFileName(modelo.Archivo.FileName);
                    string rutaFisica = Path.Combine(_rutaServidor, archivoNombre);

                    using (var stream = new FileStream(rutaFisica, FileMode.Create))
                    {
                        await modelo.Archivo.CopyToAsync(stream);
                    }
                    
                    // Guardar ruta pública en la base de datos
                    modelo.Foto = $"/uploads/{archivoNombre}";
                }
                
                var filas = await _service.AddUser(modelo);

                return Ok(new
                {
                    success = true,
                    message = "Trabajador agregado con éxito ✅",
                    filasAfectadas = filas,
                    data = modelo
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error general en Modificar: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    success = false,
                    message = "Ocurrió un error al actualizar el trabajador.",
                    detalle = ex.Message
                });
            }
        }


        /*[HttpPut]
        [Route("Modificar")]
        public async Task<IActionResult> Modificar([FromForm] Trabajador modelo)
        {
            var filas = await _service.UpdateUser(modelo);

            return Ok(new
            {
                success = true,
                message = "Trabajador editado con éxito ✅",
                filasAfectadas = filas,
                data = modelo
            });
        }*/
        [HttpPut]
        [Route("Modificar")]
        public async Task<IActionResult> Modificar([FromForm] Trabajador modelo)
        {
            try
            {
                if (modelo.Archivo != null && modelo.Archivo.Length > 0)
                {
                    string archivoNombre = Path.GetFileName(modelo.Archivo.FileName);
                    string rutaFisica = Path.Combine(_rutaServidor, archivoNombre);
                    // Si ya tiene una foto anterior, eliminarla
                    if (!string.IsNullOrEmpty(modelo.Foto))
                    {
                        string rutaAnterior = Path.Combine(_rutaServidor, Path.GetFileName(modelo.Foto));
                        if (System.IO.File.Exists(rutaAnterior))
                        {
                            System.IO.File.Delete(rutaAnterior);
                        }
                    }
                    using (var stream = new FileStream(rutaFisica, FileMode.Create))
                    {
                        await modelo.Archivo.CopyToAsync(stream);
                    }
                    // Guardar ruta pública en la base de datos
                    modelo.Foto = $"/uploads/{archivoNombre}";
                }
               
                var filas = await _service.UpdateUser(modelo);

                return Ok(new
                {
                    success = true,
                    message = "Trabajador actualizado con éxito ✅",
                    filasAfectadas = filas,
                    data =  modelo
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = ex.Message });
            }
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
