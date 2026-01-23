using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.Domain.Entities;

namespace TaskManager.Infrastructure.Repositories
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskEntity>> GetAllAsync(Guid? userId = null);
        Task<TaskEntity?> GetByIdAsync(Guid id);
        Task AddAsync(TaskEntity entity);
        Task UpdateAsync(TaskEntity entity);
        Task DeleteAsync(TaskEntity entity);
    }
}