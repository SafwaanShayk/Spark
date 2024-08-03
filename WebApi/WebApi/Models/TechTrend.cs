using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class TechTrend
    {

        [Key]
        public int Id { get; set; }

        public int Year { get; set; }

        [Required]
        [MaxLength(50)]
        public string Technology { get; set; }

        public int Publications { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        public decimal MarketSizeBillionUsd { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal AdoptionRate { get; set; }

        public int SearchTrendIndex { get; set; }

        public int NumberOfStartups { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        public decimal InvestmentBillionUsd { get; set; }

        public int JobPostings { get; set; }
    }
}