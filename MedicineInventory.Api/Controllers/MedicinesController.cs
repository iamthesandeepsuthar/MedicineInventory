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
        public async Task<bool> Add(Medicine medicine) => await _service.Add(medicine);


        [HttpPut("{id}")]
        public async Task<bool> Update(Guid id, Medicine medicine) => await _service.Update(id, medicine);

        [HttpDelete("{id}")]
        public async Task<bool> Delete(Guid id) => await _service.Delete(id);

    }
}
