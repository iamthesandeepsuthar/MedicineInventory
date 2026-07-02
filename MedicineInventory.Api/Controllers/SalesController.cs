using System;
using System.Threading.Tasks;
using MedicineInventory.Api.Models;
using MedicineInventory.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesController : ControllerBase
    {
        private readonly ISaleService _service;

        public SalesController(ISaleService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var sales = await _service.GetAll();
            return Ok(sales);
        }

        [HttpPost]
        public async Task<IActionResult> Add(SaleCreateDto saleDto)
        {
            var result = await _service.Add(saleDto);
            if (!result)
            {
                return BadRequest("Failed to record sale. Verify stock is available and medicine exists.");
            }
            return Ok(true);
        }
    }
}
