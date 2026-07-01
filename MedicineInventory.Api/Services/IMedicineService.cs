namespace MedicineInventory.Api.Services
{
    public interface IMedicineService
    {
        Task<List<Medicine>> GetAll(string? search);
        Task<Medicine?> GetById(Guid id);
        Task<bool> Add(Medicine medicine);
        Task<bool> Update(Guid id, Medicine medicine);
        Task<bool> Delete(Guid id);
    }
}
