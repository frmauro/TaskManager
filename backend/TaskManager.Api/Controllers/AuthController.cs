using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManager.Application.DTOs;
using TaskManager.Domain.Entities;
using TaskManager.Infrastructure.Data;

/// <summary>
/// Controlador responsável pela autenticação de usuários e geração de tokens JWT
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;
    private readonly ILogger<AuthController> _logger;

    public AuthController(AppDbContext db, IConfiguration config, ILogger<AuthController> logger)
    {
        _db = db;
        _config = config;
        _logger = logger;
    }

    /// <summary>
    /// Realiza login de um usuário e retorna tokens de acesso e refresh
    /// </summary>
    /// <param name="request">Credenciais do usuário (email e senha)</param>
    /// <returns>Token de acesso JWT e token de refresh</returns>
    /// <response code="200">Login realizado com sucesso</response>
    /// <response code="401">Credenciais inválidas</response>
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email && u.IsActive);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            _logger.LogWarning("Login attempt failed for email: {Email}", request.Email);
            return Unauthorized(new { message = "Credenciais inválidas" });
        }

        var (accessToken, refreshToken, expiresAt) = GenerateTokens(user);
        RefreshTokenStore.Save(refreshToken, user.Id, expiresAt.AddHours(7));

        _logger.LogInformation("User logged in: {Email}", user.Email);
        return Ok(new TokenResponse { AccessToken = accessToken, RefreshToken = refreshToken, ExpiresAt = expiresAt });
    }

    /// <summary>
    /// Renova o token de acesso usando um token de refresh
    /// </summary>
    /// <param name="request">Token de refresh válido</param>
    /// <returns>Novo token de acesso JWT</returns>
    /// <response code="200">Token renovado com sucesso</response>
    /// <response code="401">Token inválido ou expirado</response>
    [HttpPost("refresh")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public IActionResult RefreshToken([FromBody] RefreshTokenRequest request)
    {
        var (userId, isValid) = RefreshTokenStore.Validate(request.RefreshToken);
        if (!isValid)
            return Unauthorized(new { message = "Token inválido ou expirado" });

        var user = _db.Users.Find(userId);
        if (user == null)
            return Unauthorized(new { message = "Usuário não encontrado" });

        var (accessToken, newRefreshToken, expiresAt) = GenerateTokens(user);
        RefreshTokenStore.Save(newRefreshToken, user.Id, expiresAt.AddHours(7));

        return Ok(new TokenResponse { AccessToken = accessToken, RefreshToken = newRefreshToken, ExpiresAt = expiresAt });
    }

    private (string AccessToken, string RefreshToken, DateTime ExpiresAt) GenerateTokens(User user)
    {
        var jwt = _config.GetSection("Jwt");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.GetValue<string>("Key") ?? ""));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiryMinutes = jwt.GetValue<int>("ExpiryMinutes");

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("name", user.Name),
            new Claim("role", user.Role.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: jwt.GetValue<string>("Issuer"),
            audience: jwt.GetValue<string>("Audience"),
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
            signingCredentials: creds
        );

        var accessToken = new JwtSecurityTokenHandler().WriteToken(token);
        var refreshToken = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
        var expiresAt = DateTime.UtcNow.AddMinutes(expiryMinutes);

        return (accessToken, refreshToken, expiresAt);
    }

    /// <summary>
    /// Modelo de requisição para login
    /// </summary>
    public class LoginRequest
    {
        /// <summary>Email do usuário</summary>
        public string Email { get; set; } = string.Empty;
        /// <summary>Senha do usuário</summary>
        public string Password { get; set; } = string.Empty;
    }
}