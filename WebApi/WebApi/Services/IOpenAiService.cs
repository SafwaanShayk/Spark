using WebApi.Models;

namespace WebApi.Services
{
    public interface IOpenAiService
    {
        Task<string> CompleteSentence(string text);
        Task<string> CompareProjects(List<ProjectComparisonDto> projects);

    }
}
