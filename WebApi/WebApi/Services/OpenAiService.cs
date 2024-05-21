using Microsoft.Extensions.Options;
using OpenAI_API.Models;
using WebApi.Configurations;

namespace WebApi.Services
{
    public class OpenAiService : IOpenAiService


    {
        private readonly OpenAiConfig _openAiConfig;

        public OpenAiService(IOptionsMonitor<OpenAiConfig> optionsMonitor)
        {
            _openAiConfig = optionsMonitor.CurrentValue;
        }

        public async Task<string> CompleteSentence(string text)
        {
            //api instance
            var api = new OpenAI_API.OpenAIAPI(_openAiConfig.Key);
            var result = await api.Completions.GetCompletion(text);
            return result;
        }

        public async Task<string> CompleteSentenceAdvance(string text)
        {
            var api = new OpenAI_API.OpenAIAPI(_openAiConfig.Key);

            var result = await api.Completions.CreateCompletionAsync(
                new OpenAI_API.Completions.CompletionRequest(text,model:Model.CurieText, temperature:0.1));

            return result.Completions[0].Text;
        }
    }
}
