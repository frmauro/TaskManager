using AutoMapper;
using TaskManager.Application.DTOs;
using TaskManager.Domain.Entities;

namespace TaskManager.Application.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<TaskEntity, TaskDto>().ReverseMap();
            CreateMap<CreateTaskDto, TaskEntity>();
            CreateMap<UpdateTaskDto, TaskEntity>();
        }
    }
}