using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using WebApi.Helpers;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private SparkdbContext _context;


        public ProjectsController(SparkdbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var projects = await _context.Projects.ToListAsync();

            // Convert technologyStack string to array of strings
            foreach (var project in projects)
            {
                project.TechnologyStackArray = project.TechnologyStack?
                    .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                    .Select(tech => tech.Trim())
                    .ToArray(); ;
            }

            var projectsWrapper = new ProjectsWrapper { Projects = projects };
            return Ok(projectsWrapper);
        }





        [HttpGet("{id}")]
        public IActionResult GetById( int id)
        {
            var project = _context.Projects.Find(id);


            if (project==null)
            {
                return NotFound("Project not found");
            }


            return Ok(project);
        }

        public class ProjectsWrapper
        {
            public List<Project> Projects { get; set; }
        }
    }
}
