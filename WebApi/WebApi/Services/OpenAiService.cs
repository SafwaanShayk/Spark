using Microsoft.Extensions.Options;
using OpenAI_API.Models;
using WebApi.Configurations;
using WebApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OpenAI_API.Completions;
using System.Text;

namespace WebApi.Services
{
    public class OpenAiService : IOpenAiService
    {
        private readonly OpenAiConfig _openAiConfig;
        private readonly HttpClient _httpClient;

        public OpenAiService(IOptionsMonitor<OpenAiConfig> optionsMonitor, HttpClient httpClient)
        {
            _openAiConfig = optionsMonitor.CurrentValue;
            _httpClient = httpClient;
        }

        public async Task<string> CompleteSentence(string text)
        {
            var api = new OpenAI_API.OpenAIAPI(_openAiConfig.Key);
            var completionRequest = new CompletionRequest(text, model: Model.ChatGPTTurboInstruct);
            var completions = await api.Completions.CreateCompletionAsync(completionRequest);
            string response = string.Join("\n", completions.Completions.Select(c => c.Text));
            return response;
        }

        public async Task<string> CompareProjects(List<ProjectComparisonDto> projects)
        {
            var api = new OpenAI_API.OpenAIAPI(_openAiConfig.Key);
            var prompt = GenerateComparisonPrompt(projects);

            var completionRequest = new CompletionRequest(
                prompt,
                model: Model.ChatGPTTurboInstruct,
                temperature: 0.1,
                max_tokens: 500 // Increase the max tokens to allow for a more detailed response
            );

            var result = await api.Completions.CreateCompletionAsync(completionRequest);

            return result.Completions[0].Text;
        }

        private string GenerateComparisonPrompt(List<ProjectComparisonDto> projects)
        {
            var prompt = new StringBuilder("Generate a Comparative Analysis table for these projects based on Features, Cost, and Description. Use ✔️ and ❌ emojis to denote feature presence. Include Pros and Cons columns for each project. Finally, recommend the most suitable project based on the analysis. Generate the response in markdown format:\n\n");

            foreach (var project in projects)
            {
                prompt.AppendLine($"Project Name: {project.ProjectName}");
                prompt.AppendLine($"Description: {project.Description}");
                prompt.AppendLine($"Features: {project.Features}");
                prompt.AppendLine($"Cost: {project.Cost}");
                prompt.AppendLine($"Category: {project.Category}");
                prompt.AppendLine($"Technology Stack: {string.Join(", ", project.TechnologyStackArray)}");
                prompt.AppendLine();
            }

            return prompt.ToString();
        }
    }
}
