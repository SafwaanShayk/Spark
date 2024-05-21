using Microsoft.AspNetCore.Mvc;
using WebApi.Services;

namespace WebApi.Controllers
{
    public class OpenAiController:ControllerBase
    {
        private readonly ILogger<OpenAiController> _logger;
        private readonly IOpenAiService _openAiService;

        public OpenAiController(ILogger<OpenAiController> logger,OpenAiService openAiService) 
        {
            _logger = logger;
            _openAiService = openAiService;
        
        }

        [HttpPost()]
        [Route("CompleteSentence")]

        public async Task<IActionResult> CompleteSentence(string text)
        {
            var result = await _openAiService.CompleteSentence(text);
            return Ok(result);
        }

        //[HttpPost()]
        //[Route("CompleteSentence")]

        //public async Task<IActionResult> CompleteSentence (string text)
        //{
        //    var result = await _openAiService.CompleteSentenceAdvance(text);
        //    return Ok(result);
        //}


    }
}
