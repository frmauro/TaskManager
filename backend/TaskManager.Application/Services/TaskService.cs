using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TaskManager.Application.DTOs;
using TaskManager.Application.Interfaces;
using TaskManager.Domain.Entities;
using TaskManager.Infrastructure.Data;

namespace TaskManager.Application.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _db;
        private readonly IMapper _mapper;

        public TaskService(AppDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<TaskDto> CreateAsync(CreateTaskDto dto)
        {
            var entity = new TaskEntity
            {
                Title = dto.Title,
                Description = dto.Description,
                Priority = dto.Priority,
                DueDate = dto.DueDate,
                CreatedAt = DateTime.UtcNow,
                UserId = dto.UserId ?? Guid.Empty
            };

            _db.Tasks.Add(entity);
            await _db.SaveChangesAsync();

            return _mapper.Map<TaskDto>(entity);
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await _db.Tasks.FindAsync(id);
            if (entity == null) return false;
            _db.Tasks.Remove(entity);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<TaskDto>> GetAllAsync(Guid? userId = null)
        {
            var query = _db.Tasks.AsQueryable();
            if (userId.HasValue && userId.Value != Guid.Empty)
                query = query.Where(t => t.UserId == userId.Value);
            var list = await query.ToListAsync();
            return _mapper.Map<IEnumerable<TaskDto>>(list);
        }

        public async Task<TaskDto?> GetByIdAsync(Guid id)
        {
            var entity = await _db.Tasks.FindAsync(id);
            return entity == null ? null : _mapper.Map<TaskDto>(entity);
        }

        public async Task<bool> UpdateAsync(Guid id, UpdateTaskDto dto)
        {
            var entity = await _db.Tasks.FindAsync(id);
            if (entity == null) return false;

            entity.Title = dto.Title;
            entity.Description = dto.Description;
            entity.IsCompleted = dto.IsCompleted;
            entity.Priority = dto.Priority;
            entity.DueDate = dto.DueDate;
            entity.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();
            return true;
        }
    }
}