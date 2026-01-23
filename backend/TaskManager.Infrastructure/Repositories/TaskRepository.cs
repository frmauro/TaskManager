using Microsoft.EntityFrameworkCore;
using TaskManager.Domain.Entities;
using TaskManager.Infrastructure.Data;

namespace TaskManager.Infrastructure.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _db;
        public TaskRepository(AppDbContext db) => _db = db;

        public async Task AddAsync(TaskEntity entity)
        {
            _db.Tasks.Add(entity);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(TaskEntity entity)
        {
            _db.Tasks.Remove(entity);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<TaskEntity>> GetAllAsync(Guid? userId = null)
        {
            var query = _db.Tasks.AsQueryable();
            if (userId.HasValue && userId.Value != Guid.Empty)
                query = query.Where(t => t.UserId == userId.Value);
            return await query.ToListAsync();
        }

        public async Task<TaskEntity?> GetByIdAsync(Guid id)
        {
            return await _db.Tasks.FindAsync(id);
        }

        public async Task UpdateAsync(TaskEntity entity)
        {
            _db.Tasks.Update(entity);
            await _db.SaveChangesAsync();
        }
    }
}