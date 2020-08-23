using HomemadePizza.DataContext.Models;
using HomemadePizza.DataContext.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomemadePizza.DataProvider
{
    public class UserRepository : IUserRepository
    {
        DataBaseContext _context;
        public UserRepository(DataBaseContext context)
        {
            _context = context;
        }

        public async Task<User> AddUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetUser(string name, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Name == name && u.Password == password);
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}
