using System;

namespace MedicineInventory.Api.Models;

public class SaleCreateDto
{
    public Guid MedicineId { get; set; }
    public int Quantity { get; set; }
}
