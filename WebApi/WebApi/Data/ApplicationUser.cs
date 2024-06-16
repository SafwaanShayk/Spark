using Microsoft.AspNetCore.Identity;
using WebApi.Models;

public class ApplicationUser : IdentityUser<int>
{
    // Navigation Property
    public virtual Project Project { get; set; }
}
