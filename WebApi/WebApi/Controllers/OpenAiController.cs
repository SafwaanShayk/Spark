using Microsoft.AspNetCore.Mvc;
using WebApi.Services;

using WebApi.Models;
using OpenAI_API;
using OpenAI_API.Models;
using OpenAI_API.Completions; // Adjust the namespace as per your package structure

namespace WebApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class OpenAiController : ControllerBase
    {

        private readonly ILogger<OpenAiController> _logger;
        private readonly IOpenAiService _openAiService;

        public OpenAiController(ILogger<OpenAiController> logger, IOpenAiService openAiService)
        {
            _logger = logger;
            _openAiService = openAiService;

        }

        [HttpGet("CompleteSentence")]
        public async Task<IActionResult> CompleteSentence(string text)
        {
            var result = await _openAiService.CompleteSentence(text);
            return Ok(result);
        }

        [HttpPost("compare-projects")]
        public async Task<IActionResult> CompareProjects([FromBody] List<ProjectComparisonDto> projects)
        {
            if (projects == null || !projects.Any())
            {
                return BadRequest("No projects provided for comparison.");
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            var result = await _openAiService.CompareProjects(projects);
            return Ok(result);
        }



        // [HttpGet("CompleteSentence")]
        // public async Task<IActionResult> CompleteSence(string query)
        // {
        //     try
        //     {
        //         // Create a completion request for the ChatGPT model
        //         var completionRequest = new CompletionRequest(query, model: Model.ChatGPTTurboInstruct);

        //         // Make API call to OpenAI to get completions
        //         var completions = await _openAiApi.Completions.CreateCompletionAsync(completionRequest);

        //         // Concatenate completions into a single string response
        //         string response = string.Join("\n", completions.Completions.Select(c => c.Text));

        //         return Ok(response);
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, $"An error occurred: {ex.Message}");
        //     }
        // }


    }

}




