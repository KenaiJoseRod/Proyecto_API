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
            return Ok(new
            {
                message = "Listado de trabajadores",
                usuario
            });
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
        public async Task<IActionResult> Agregar([FromBody] Trabajador modelo)
        {
            var filas = await _service.AddUser(modelo);
            // Asumiendo que modelo. Id se llena tras SaveChangesAsync()

            return Ok(new
            {
                message = "Trabajador creado con éxito ✅",
                filas
            });
        }
        [HttpPut]
        [Route("Modificar")]
        public async Task<IActionResult> Modificar([FromBody] Trabajador modelo)
        {
            var filas = await _service.UpdateUser(modelo);
            // Asumiendo que modelo.Id se llena tras SaveChangesAsync()
            return Ok(new
            {
                message = "Trabajador editado con éxito ✅",
                filas
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
