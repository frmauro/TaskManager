using System;
using TaskManager.Domain.Entities;

namespace TaskManager.Application.DTOs
{
    public class CreateTaskDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public Priority Priority { get; set; } = Priority.Medium;
        public DateTime? DueDate { get; set; }
        public Guid? UserId { get; set; }
    }
}