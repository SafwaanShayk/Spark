using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApi.Models;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{

    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly TokenService _tokenService;

    public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, TokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] Register model)
    {
        var user = new ApplicationUser
        {
            UserName = model.Username,
            Email = model.Email
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            return Ok(new { Message = "User registered successfully" });
        }

        return BadRequest(result.Errors);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Login login)
    {
        var user = await _userManager.FindByNameAsync(login.Username);
        if (user == null)
        {
            return Unauthorized("Invalid username or password.");
        }

        var result = await _signInManager.PasswordSignInAsync(user, login.Password, false, false);
        if (!result.Succeeded)
        {
            return Unauthorized("Invalid username or password.");
        }

        var token = _tokenService.GenerateToken(user);
        return Ok(new { Token = token });
    }


    [Authorize]
    [HttpGet("currentUser")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;

        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
        {
            Console.WriteLine("Valid user ID claim not found.");
            return Unauthorized("Valid user ID is required.");
        }

        var user = await _userManager.FindByIdAsync(userIdClaim);

        if (user == null)
        {
            return NotFound("User not found.");
        }

        var userInfo = new
        {
            user.UserName,
            user.Email,
            user.Id
        };

        return Ok(userInfo);
    }
    [HttpGet("users/all")]
    public IActionResult GetAllUsers()
    {
        var users = _userManager.Users
            .Select(u => new ApplicationUser
            {
                UserName = u.UserName,
                Email = u.Email,
                Id = u.Id
            })
            .ToList();

        return Ok(users);
    }
}
