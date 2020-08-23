using HomemadePizza.DataContext.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomemadePizza.DataProvider
{
    public class DataBaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Pizza> Pizzas { get; set; }

        public DataBaseContext(DbContextOptions<DataBaseContext> options)
            :base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var pizzaEntity = modelBuilder.Entity<Pizza>();
            pizzaEntity.HasData(
            new Pizza() { Id = 1, Label = "Test pizza 1", Price = 10, Description = "Test" },
            new Pizza() { Id = 2, Label = "Test pizza 2", Price = 20, Description = "Test" },
            new Pizza() { Id = 3, Label = "Test pizza 3", Price = 25, Description = "Test" },
            new Pizza() { Id = 4, Label = "Test pizza 4", Price = 30, Description = "Test" },
            new Pizza() { Id = 5, Label = "Test pizza 5", Price = 50, Description = "Test" }
            );
            pizzaEntity.HasKey(p => p.Id);

            var userEntity = modelBuilder.Entity<User>();
            userEntity.HasKey(u => u.Id);
        }
    }
}
