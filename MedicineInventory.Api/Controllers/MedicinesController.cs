using MedicineInventory.Api;
using MedicineInventory.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicinesController : ControllerBase
    {
        private readonly IMedicineService _service;

        public MedicinesController(IMedicineService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] string? search)
        {
            var medicines =
                await _service.GetAll(search);

            return Ok(medicines);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var medicine =
                await _service.GetById(id);

            if (medicine == null)
                return NotFound();

            return Ok(medicine);
        }

        [HttpPost]
        public async Task<IActionResult> Add(
            Medicine medicine)
        {
            var result =
                await _service.Add(medicine);

            return CreatedAtAction(
                nameof(GetById),
                new { id = result.Id },
                result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            Guid id,
            Medicine medicine)
        {
            var updated =
                await _service.Update(id, medicine);

            if (!updated)
                return NotFound();

            return Ok("Medicine updated successfully.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted =
                await _service.Delete(id);

            if (!deleted)
                return NotFound();

            return Ok("Medicine deleted successfully.");
        }
    }
}
