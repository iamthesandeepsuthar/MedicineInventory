using System.Text.Json;

namespace MedicineInventory.Api.Services;


public class MedicineService : IMedicineService
{
    private readonly string _filePath;

    public MedicineService(IWebHostEnvironment env)
    {
        string dataFolder = Path.Combine(env.ContentRootPath, "Data");

        if (!Directory.Exists(dataFolder))
        {
            _ = Directory.CreateDirectory(dataFolder);
        }

        _filePath = Path.Combine(dataFolder, "medicines.json");

        if (!File.Exists(_filePath))
        {
            File.WriteAllText(_filePath, "[]");
        }
    }

    private async Task<List<Medicine>> ReadFile()
    {
        string json = await File.ReadAllTextAsync(_filePath);

        return string.IsNullOrWhiteSpace(json)
                ? []
                : JsonSerializer.Deserialize<List<Medicine>>(json)
                   ?? [];
    }

    private async Task SaveFile(List<Medicine> medicines)
    {
        string json = JsonSerializer.Serialize(
                medicines,
                new JsonSerializerOptions
                {
                    WriteIndented = true
                });

        await File.WriteAllTextAsync(_filePath, json);
    }

    public async Task<List<Medicine>> GetAll(string? search)
    {
        List<Medicine> medicines = await ReadFile();

        if (!string.IsNullOrWhiteSpace(search))
        {
            medicines = medicines
                .Where(x =>
                        (!string.IsNullOrEmpty(x.FullName) && x.FullName.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                        (!string.IsNullOrEmpty(x.Brand) && x.Brand.Contains(search, StringComparison.OrdinalIgnoreCase)))
                .ToList();
        }

        return medicines;
    }

    public async Task<Medicine?> GetById(Guid id)
    {
        List<Medicine> medicines = await ReadFile();

        return medicines.FirstOrDefault(x => x.Id == id);
    }

    public async Task<bool> Add(Medicine medicine)
    {
        List<Medicine> medicines = await ReadFile();

        medicine.Id = Guid.NewGuid();

        medicines.Add(medicine);

        await SaveFile(medicines);

        return true;
    }

    public async Task<bool> Update(Guid id, Medicine medicine)
    {

        List<Medicine> medicines = await ReadFile();

        Medicine? existing =
                medicines.FirstOrDefault(x => x.Id == id);

        if (existing == null)
        {
            return false;
        }

        existing.FullName = medicine.FullName;
        existing.Brand = medicine.Brand;
        existing.Notes = medicine.Notes;
        existing.ExpiryDate = medicine.ExpiryDate;
        existing.Quantity = medicine.Quantity;
        existing.Price = medicine.Price;

        await SaveFile(medicines);

        return true;
    }

    public async Task<bool> Delete(Guid id)
    {
        List<Medicine> medicines = await ReadFile();

        Medicine? medicine =
                medicines.FirstOrDefault(x => x.Id == id);

        if (medicine == null)
        {
            return false;
        }

        _ = medicines.Remove(medicine);

        await SaveFile(medicines);

        return true;
    }
}

