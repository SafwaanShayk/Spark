
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApi.Configurations;
using WebApi.Controllers;
using WebApi.Models;
using WebApi.RequestHelpers;
using WebApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Build configuration
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);


// Add services to the container.


//services cors
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
// Register TechnologyStackService
builder.Services.AddTransient<TechnologyStackService>();
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));
builder.Services.AddSingleton<FileStorageService>();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile)); // Ensure AutoMapperProfile is referenced correctly

builder.Services.Configure<OpenAiConfig>(builder.Configuration.GetSection("OpenAI"));
builder.Services.AddHttpClient<IOpenAiService, OpenAiService>();

builder.Services.AddRazorPages();

builder.Services.AddDbContext<SparkdbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));
builder.Services.AddIdentity<ApplicationUser, IdentityRole<int>>(opt =>
{
    opt.User.RequireUniqueEmail = true;
})
         .AddEntityFrameworkStores<SparkdbContext>()
         .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
  {
      options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
      options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
  })
  .AddJwtBearer(options =>
  {
      options.TokenValidationParameters = new TokenValidationParameters
      {
          ValidateIssuer = true,
          ValidateAudience = true,
          ValidateLifetime = true,
          ValidateIssuerSigningKey = true,
          ValidIssuer = builder.Configuration["Jwt:Issuer"],
          ValidAudience = builder.Configuration["Jwt:Audience"],
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
      };
  });
builder.Services.AddScoped<TokenService>();

// Add authorization
builder.Services.AddAuthorization();
builder.Services.AddControllers();

builder.Services.AddScoped<IOpenAiService, OpenAiService>();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseCors("corsapp");

app.UseAuthentication();

app.UseAuthorization();

app.MapRazorPages();

app.MapControllers();

app.Run();
