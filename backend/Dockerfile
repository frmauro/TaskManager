# Use the official .NET 8.0 SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory inside the container
WORKDIR /src

# Copy the solution file and project files for dependency resolution
COPY ["backend.sln", "./"]
COPY ["TaskManager.Api/TaskManager.Api.csproj", "TaskManager.Api/"]
COPY ["TaskManager.Application/TaskManager.Application.csproj", "TaskManager.Application/"]
COPY ["TaskManager.Domain/TaskManager.Domain.csproj", "TaskManager.Domain/"]
COPY ["TaskManager.Infrastructure/TaskManager.Infrastructure.csproj", "TaskManager.Infrastructure/"]

# Restore dependencies for the API project
RUN dotnet restore "TaskManager.Api/TaskManager.Api.csproj"

# Copy the entire source code
COPY . .

# Set the working directory to the API project
WORKDIR "/src/TaskManager.Api"

# Build the application in Release mode
RUN dotnet build "TaskManager.Api.csproj" -c Release -o /app/build

# Publish the application
RUN dotnet publish "TaskManager.Api.csproj" -c Release -o /app/publish

# Use the official .NET 8.0 ASP.NET Core runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

# Set the working directory inside the container
WORKDIR /app

# Copy the published application from the build stage
COPY --from=build /app/publish .

# Expose port 80 for the application
EXPOSE 80

# Set the entry point for the application
ENTRYPOINT ["dotnet", "TaskManager.Api.dll"]