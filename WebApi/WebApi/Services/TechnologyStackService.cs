public class TechnologyStackService
{
    public string[] ConvertTechnologyStack(string technologyStack)
    {
        if (string.IsNullOrEmpty(technologyStack))
            return Array.Empty<string>();

        return technologyStack.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                              .Select(tech => tech.Trim())
                              .ToArray();
    }
}