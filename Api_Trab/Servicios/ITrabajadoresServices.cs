using Api_Trab.Models;

namespace Api_Trab.Servicios
{
    public interface ITrabajadoresServices
    {
        Task<List<Trabajador>> AllUsers();
        Task<Trabajador?> GetUserById(int id);
        Task<int> AddUser(Trabajador modelo);
        Task<int> UpdateUser(Trabajador modelo);
        Task<int> DeleteUser(int id);
    }
}
