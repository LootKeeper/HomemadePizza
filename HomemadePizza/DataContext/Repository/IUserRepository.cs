using HomemadePizza.DataContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomemadePizza.DataContext.Repository
{
    public interface IUserRepository
    {
        Task<User> AddUser(User user);
        Task<User> GetUser(string name, string password);
        Task<User> GetUser(int Id);
    }
}
