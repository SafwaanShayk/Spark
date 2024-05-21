using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    public partial class Project
    {
        public double? Id { get; set; }
        public string? ProjectName { get; set; }
        public string? Description { get; set; }
        public double? Cost { get; set; }
        public string? Category { get; set; }
        public string? Features { get; set; }
        public string? UserInterface { get; set; }
        public string? TechnologyStack { get; set; }

        [NotMapped] 
        public string[]? TechnologyStackArray { get; set; }


    }
}
