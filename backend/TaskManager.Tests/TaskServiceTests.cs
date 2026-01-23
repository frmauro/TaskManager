using Xunit;
using Microsoft.EntityFrameworkCore;
using TaskManager.Infrastructure.Data;
using TaskManager.Domain.Entities;
using TaskManager.Application.Services;
using TaskManager.Application.DTOs;
using AutoMapper;
using TaskManager.Application.Profiles;

public class TaskServiceTests : IDisposable
{
    private readonly AppDbContext _db;
    private readonly TaskService _service;

    public TaskServiceTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        _db = new AppDbContext(options);
        var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<MappingProfile>()));
        _service = new TaskService(_db, mapper);
    }

    [Fact]
    public async Task CreateAsync_WithValidData_ShouldCreateTask()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var dto = new CreateTaskDto { Title = "Test Task", Priority = Priority.High, UserId = userId };

        // Act
        var result = await _service.CreateAsync(dto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Task", result.Title);
        Assert.Equal(userId, result.UserId);
    }

    [Fact]
    public async Task GetAllAsync_WithoutFilter_ShouldReturnAllTasks()
    {
        // Arrange
        var userId = Guid.NewGuid();
        await _db.Tasks.AddAsync(new TaskEntity { Title = "Task 1", UserId = userId });
        await _db.Tasks.AddAsync(new TaskEntity { Title = "Task 2", UserId = userId });
        await _db.SaveChangesAsync();

        // Act
        var result = await _service.GetAllAsync();

        // Assert
        Assert.Equal(2, result.Count());
    }

    [Fact]
    public async Task DeleteAsync_WithValidId_ShouldDeleteTask()
    {
        // Arrange
        var task = new TaskEntity { Title = "To Delete", UserId = Guid.NewGuid() };
        _db.Tasks.Add(task);
        await _db.SaveChangesAsync();

        // Act
        var result = await _service.DeleteAsync(task.Id);

        // Assert
        Assert.True(result);
        var deletedTask = await _db.Tasks.FindAsync(task.Id);
        Assert.Null(deletedTask);
    }

    public void Dispose()
    {
        _db?.Dispose();
    }
}