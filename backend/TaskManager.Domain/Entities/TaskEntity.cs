using System;

namespace TaskManager.Domain.Entities
{
    public enum Priority
    {
        Low = 0,
        Medium = 1,
        High = 2
    }

    public class TaskEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsCompleted { get; set; } = false;
        public Priority Priority { get; set; } = Priority.Medium;
        public DateTime? DueDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Foreign key
        public Guid UserId { get; set; }
        public User? User { get; set; }
    }
}