using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApi.Models
{
    public partial class Project
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Project_Id { get; set; }

        // Foreign Key
        public int? User_Id { get; set; }

        // Navigation Property   
        [JsonIgnore]

        public virtual ApplicationUser User { get; set; }
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
