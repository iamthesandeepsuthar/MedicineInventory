using System.Collections.Generic;
using System.Threading.Tasks;
using MedicineInventory.Api.Models;

namespace MedicineInventory.Api.Services;

public interface ISaleService
{
    Task<List<Sale>> GetAll();
    Task<bool> Add(SaleCreateDto saleDto);
}
