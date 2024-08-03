using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TechTrendsController : ControllerBase
    {
        private readonly SparkdbContext _context;

        public TechTrendsController(SparkdbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TechTrend>>> GetTechTrends()
        {
            return await _context.TechTrends.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TechTrend>> GetTechTrend(int id)
        {
            var techTrend = await _context.TechTrends.FindAsync(id);

            if (techTrend == null)
            {
                return NotFound();
            }

            return techTrend;
        }

        [HttpPost]
        public async Task<ActionResult<TechTrend>> PostTechTrend(TechTrend techTrend)
        {
            _context.TechTrends.Add(techTrend);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTechTrend), new { id = techTrend.Id }, techTrend);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTechTrend(int id, TechTrend techTrend)
        {
            if (id != techTrend.Id)
            {
                return BadRequest();
            }

            _context.Entry(techTrend).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TechTrendExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTechTrend(int id)
        {
            var techTrend = await _context.TechTrends.FindAsync(id);
            if (techTrend == null)
            {
                return NotFound();
            }

            _context.TechTrends.Remove(techTrend);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TechTrendExists(int id)
        {
            return _context.TechTrends.Any(e => e.Id == id);
        }
    }
}
