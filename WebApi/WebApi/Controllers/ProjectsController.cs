using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Linq.Expressions;
using System.Security.Claims;
using WebApi.Models;
using WebApi.RequestHelpers;

namespace WebApi.Controllers
{
    public static class LinqExtensions
    {
        public enum Order
        {
            Asc,
            Desc
        }

        public static IQueryable<T> OrderByDynamic<T>(this IQueryable<T> query, string propertyName, Order order)
        {
            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.Property(parameter, propertyName);
            var lambda = Expression.Lambda(property, parameter);

            string methodName = (order == Order.Asc) ? "OrderBy" : "OrderByDescending";
            var resultExpression = Expression.Call(typeof(Queryable), methodName, new Type[] { typeof(T), property.Type }, query.Expression, Expression.Quote(lambda));

            return query.Provider.CreateQuery<T>(resultExpression);
        }
    }



    [ApiController]
    [Route("api/projects")]
    public class ProjectsController : ControllerBase
    {
        private readonly SparkdbContext _context;
        private readonly TechnologyStackService _technologyStackService;
        private readonly FileStorageService _fileStorageService;
        private readonly IMapper _mapper;

        public ProjectsController(SparkdbContext context, TechnologyStackService technologyStackService, FileStorageService fileStorageService, IMapper mapper)
        {
            _context = context;
            _technologyStackService = technologyStackService;
            _fileStorageService = fileStorageService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(string search, string category, string techStack, int page, int pageSize, string sortBy, string sortDirection)
        {
            var query = _context.Projects.AsQueryable();

            if (page <= 0 || pageSize <= 0)
                return BadRequest("Page and PageSize should be greater than zero.");

            // Searching
            if (!string.IsNullOrEmpty(search) && search.ToLower() != "null")
            {
                query = query.Where(p => p.Description.ToLower().Contains(search.ToLower()));
            }

            // Filter by category
            if (!string.IsNullOrEmpty(category) && category.ToLower() != "null")
            {
                query = query.Where(p => p.Category.ToLower().Contains(category.ToLower()));
            }

            // Filter by tech stack
            if (!string.IsNullOrEmpty(techStack) && techStack.ToLower() != "null")
            {
                query = query.Where(p => p.TechnologyStack.ToLower().Contains(techStack.ToLower()));
            }

            // Sorting
            if (!string.IsNullOrEmpty(sortBy))
            {
                var order = sortDirection == "asc" ? LinqExtensions.Order.Asc : LinqExtensions.Order.Desc;
                query = query.OrderByDynamic(sortBy, order);
            }

            // Pagination
            var totalRecords = await query.CountAsync();
            var projects = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            // Convert technologyStack string to array of strings
            projects.ForEach(project => project.TechnologyStackArray = _technologyStackService.ConvertTechnologyStack(project.TechnologyStack));

            var response = new { total = totalRecords, Projects = projects };
            return Ok(response);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllProjectsSimple()
        {
            try
            {
                var projects = await _context.Projects.ToListAsync();
                // Convert technologyStack string to array of strings
                projects.ForEach(project => project.TechnologyStackArray = _technologyStackService.ConvertTechnologyStack(project.TechnologyStack));

                return Ok(projects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            try
            {
                var categories = _context.Projects
                    .Select(p => p.Category)
                    .Distinct()
                    .ToList();

                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound(new { message = "Project not found" });
            }

            return Ok(new { Project = project });
        }


        [Authorize]
        [HttpGet("user-projects")]
        public async Task<IActionResult> GetUserProjects()
        {
            // Get the user ID from the claims
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                Console.WriteLine("Valid user ID claim not found.");
                return Unauthorized("Valid user ID is required.");
            }

            if (userIdClaim == null)
            {
                return Unauthorized("User is not logged in.");
            }

            // Fetch the projects assigned to the user
            var userProjects = await _context.Projects
                .Where(p => p.User_Id == userId) // Adjust based on your model
                .ToListAsync();

            if (userProjects == null || !userProjects.Any())
            {
                return NotFound("No projects found for the user.");
            }

            return Ok(userProjects);
        }


        [Authorize]
        [HttpPost("add"), DisableRequestSizeLimit]
        public async Task<IActionResult> AddProject([FromForm] ProjectDto projectDto, IFormFile UserInterface)
        {
            if (projectDto == null)
            {
                return BadRequest("Project data is required.");
            }

            var project = _mapper.Map<Project>(projectDto);

            if (UserInterface != null)
            {
                try
                {
                    string imageUrl = await _fileStorageService.UploadFileAsync(UserInterface);
                    project.UserInterface = imageUrl;
                }
                catch (Exception ex)
                {
                    return StatusCode(500, "Error uploading image: " + ex.Message);
                }
            }


            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                Console.WriteLine("Valid user ID claim not found.");
                return Unauthorized("Valid user ID is required.");
            }

            if (userIdClaim == null)
            {
                return BadRequest("Invalid user ID format.");
            }

            // Associate project with user
            project.User_Id = userId;

            try
            {
                _context.Projects.Add(project);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetById), new { id = project.Project_Id }, project);
            }
            catch (Exception ex)
            {
                var innerMessage = ex.InnerException != null ? ex.InnerException.Message : "No inner exception";
                return StatusCode(500, "Error uploading image: " + ex.Message + " Inner exception: " + innerMessage);
            }
        }


        // [HttpPut("update/{id}")]
        // public async Task<IActionResult> UpdateProject(int id, [FromForm] ProjectDto projectDto)
        // {
        //     var project = await _context.Projects.FindAsync(id);
        //     if (project == null)
        //     {
        //         return NotFound(new { message = "Project not found" });
        //     }

        //     // Map the updated fields from DTO
        //     _mapper.Map(projectDto, project);

        //     if (projectDto.UserInterface != null)
        //     {
        //         try
        //         {
        //             string imageUrl = await _fileStorageService.UploadFileAsync(projectDto.UserInterface);


        //             if (!string.IsNullOrEmpty(project.UserInterface))
        //                 await _fileStorageService.DeleteImageAsync(project.UserInterface);

        //             project.UserInterface = imageUrl; // Directly assign the string 
        //         }
        //         catch (Exception ex)
        //         {
        //             return StatusCode(500, "Error uploading image: " + ex.Message);
        //         }
        //     }

        //     try
        //     {
        //         _context.Projects.Update(project);
        //         await _context.SaveChangesAsync();
        //         return Ok(new { message = "Project updated successfully", Project = project });
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, "Error updating project: " + ex.Message);
        //     }
        // }



        [Authorize]
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromForm] ProjectDto projectDto)
        {

            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                Console.WriteLine("Valid user ID claim not found.");
                return Unauthorized("Valid user ID is required.");
            }

            if (userIdClaim == null)
            {
                return BadRequest("Invalid user ID format.");
            }

            // Find the project to update
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound(new { message = "Project not found" });
            }

            // Check if the project belongs to the authenticated user
            if (project.User_Id != userId)
            {
                return Forbid("You are not authorized to update this project.");
            }

            // Map the updated fields from DTO
            _mapper.Map(projectDto, project);

            if (projectDto.UserInterface != null)
            {
                try
                {
                    string imageUrl = await _fileStorageService.UploadFileAsync(projectDto.UserInterface);

                    if (!string.IsNullOrEmpty(project.UserInterface))
                        await _fileStorageService.DeleteImageAsync(project.UserInterface);

                    project.UserInterface = imageUrl; // Directly assign the string 
                }
                catch (Exception ex)
                {
                    return StatusCode(500, "Error uploading image: " + ex.Message);
                }
            }

            try
            {
                _context.Projects.Update(project);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Project updated successfully", Project = project });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error updating project: " + ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {

            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                Console.WriteLine("Valid user ID claim not found.");
                return Unauthorized("Valid user ID is required.");
            }
            if (userIdClaim == null)
            {
                Console.WriteLine("Invalid user ID format.");
                return BadRequest("Invalid user ID format.");
            }

            // Find the project to delete
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound(new { message = "Project not found" });
            }

            // Check if the project belongs to the authenticated user
            if (project.User_Id != userId)
            {
                return Forbid("You are not authorized to delete this project.");
            }

            // Proceed with deletion
            if (!string.IsNullOrEmpty(project.UserInterface))
            {
                try
                {
                    await _fileStorageService.DeleteImageAsync(project.UserInterface);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, "Error deleting image: " + ex.Message);
                }
            }
            _context.Projects.Remove(project);
            try
            {
                var result = await _context.SaveChangesAsync() > 0;
                if (result) return Ok(new { message = "Project deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error deleting project: " + ex.Message);
            }
            return StatusCode(500, "Failed to delete the project due to an unknown error.");
        }



        [HttpGet("error")]
        public IActionResult GetError()
        {
            var problemDetails = new ProblemDetails
            {
                Status = StatusCodes.Status500InternalServerError,
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred. Please try again later."
            };

            return StatusCode(problemDetails.Status.Value, problemDetails);
        }
    }

}