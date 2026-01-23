using System;
using System.Linq;
using BCrypt.Net;
using TaskManager.Domain.Entities;

namespace TaskManager.Infrastructure.Seed
{
    public static class SeedData
    {
        public static void Initialize(TaskManager.Infrastructure.Data.AppDbContext context)
        {
            if (context.Users.Any()) return;

            var admin = new User
            {
                Name = "Admin",
                Email = "admin@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            context.Users.Add(admin);
            context.SaveChanges();
        }
    }
}