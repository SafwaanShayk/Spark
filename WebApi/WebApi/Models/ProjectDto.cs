using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class ProjectDto
    {
        [Required]
        public string? ProjectName { get; set; }
        [Required]
        public string? Description { get; set; }
        [Required]
        [Range(1, Double.PositiveInfinity)]
        public double? Cost { get; set; }
        [Required]
        public string? Category { get; set; }
        [Required]
        public string? Features { get; set; }
        [Required]
        public IFormFile? UserInterface { get; set; }
        [Required]
        public string? TechnologyStack { get; set; }
    }


}