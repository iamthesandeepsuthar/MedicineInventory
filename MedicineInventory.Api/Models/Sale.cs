using System;

namespace MedicineInventory.Api.Models;

public class Sale
{
    public Guid Id { get; set; }
    public Guid MedicineId { get; set; }
    public string MedicineName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
    public DateTime SaleDate { get; set; }
}
