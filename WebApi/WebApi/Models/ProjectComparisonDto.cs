using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class ProjectComparisonDto
    {
        public int Project_Id { get; set; }
        public string? ProjectName { get; set; }
        public string? Description { get; set; }
        public double? Cost { get; set; }
        public string? Category { get; set; }
        public string? Features { get; set; }
        public string? UserInterface { get; set; }
        public string? TechnologyStack { get; set; }
        public string[]? TechnologyStackArray { get; set; }
    }
}