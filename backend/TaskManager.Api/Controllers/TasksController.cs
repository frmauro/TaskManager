using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Application.DTOs;
using TaskManager.Application.Interfaces;

/// <summary>
/// Controlador responsável pela gerenciamento de tarefas
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly ITaskService _service;
    private readonly ILogger<TasksController> _logger;

    public TasksController(ITaskService service, ILogger<TasksController> logger)
    {
        _service = service;
        _logger = logger;
    }

    private Guid GetUserIdFromClaims()
    {
        var sub = User.FindFirst(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub)?.Value;
        if (Guid.TryParse(sub, out var id)) return id;
        return Guid.Empty;
    }

    /// <summary>
    /// Obtém todas as tarefas do usuário autenticado
    /// </summary>
    /// <returns>Lista de tarefas</returns>
    /// <response code="200">Lista de tarefas retornada com sucesso</response>
    /// <response code="401">Usuário não autenticado</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetAll()
    {
        var userId = GetUserIdFromClaims();
        _logger.LogInformation("Fetching tasks for user: {UserId}", userId);
        var tasks = await _service.GetAllAsync(userId == Guid.Empty ? null : userId);
        return Ok(tasks);
    }

    /// <summary>
    /// Obtém uma tarefa específica pelo ID
    /// </summary>
    /// <param name="id">ID da tarefa</param>
    /// <returns>Dados da tarefa</returns>
    /// <response code="200">Tarefa encontrada</response>
    /// <response code="401">Usuário não autenticado</response>
    /// <response code="404">Tarefa não encontrada</response>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var task = await _service.GetByIdAsync(id);
        if (task == null)
        {
            _logger.LogWarning("Task not found: {TaskId}", id);
            return NotFound(new { message = "Tarefa não encontrada" });
        }
        return Ok(task);
    }

    /// <summary>
    /// Cria uma nova tarefa para o usuário autenticado
    /// </summary>
    /// <param name="dto">Dados da tarefa a ser criada</param>
    /// <returns>Tarefa criada</returns>
    /// <response code="201">Tarefa criada com sucesso</response>
    /// <response code="400">Dados inválidos</response>
    /// <response code="401">Usuário não autenticado</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Create([FromBody] CreateTaskDto dto)
    {
        var userId = GetUserIdFromClaims();
        if (userId != Guid.Empty)
            dto.UserId = userId;

        _logger.LogInformation("Creating task: {Title} for user: {UserId}", dto.Title, userId);
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    /// <summary>
    /// Atualiza uma tarefa existente
    /// </summary>
    /// <param name="id">ID da tarefa a atualizar</param>
    /// <param name="dto">Dados atualizados da tarefa</param>
    /// <returns>Sem conteúdo</returns>
    /// <response code="204">Tarefa atualizada com sucesso</response>
    /// <response code="400">Dados inválidos</response>
    /// <response code="401">Usuário não autenticado</response>
    /// <response code="404">Tarefa não encontrada</response>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateTaskDto dto)
    {
        _logger.LogInformation("Updating task: {TaskId}", id);
        var updated = await _service.UpdateAsync(id, dto);
        if (!updated)
        {
            _logger.LogWarning("Task not found for update: {TaskId}", id);
            return NotFound(new { message = "Tarefa não encontrada" });
        }
        return NoContent();
    }

    /// <summary>
    /// Deleta uma tarefa
    /// </summary>
    /// <param name="id">ID da tarefa a deletar</param>
    /// <returns>Sem conteúdo</returns>
    /// <response code="204">Tarefa deletada com sucesso</response>
    /// <response code="401">Usuário não autenticado</response>
    /// <response code="404">Tarefa não encontrada</response>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        _logger.LogInformation("Deleting task: {TaskId}", id);
        var deleted = await _service.DeleteAsync(id);
        if (!deleted)
        {
            _logger.LogWarning("Task not found for deletion: {TaskId}", id);
            return NotFound(new { message = "Tarefa não encontrada" });
        }
        return NoContent();
    }
}