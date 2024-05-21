
using Microsoft.EntityFrameworkCore;
using WebApi.Configurations;
using WebApi.Models;
using WebApi.Services;

var builder = WebApplication.CreateBuilder(args);

//services cors
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
// Add services to the container.
builder.Services.Configure<OpenAiConfig>(builder.Configuration.GetSection("OpenAI"));

builder.Services.AddRazorPages();

builder.Services.AddDbContext<SparkdbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));
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


app.UseAuthorization();

app.MapRazorPages();

app.MapControllers();

app.Run();
