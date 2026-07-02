using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using MedicineInventory.Api;
using MedicineInventory.Api.Models;
using Microsoft.AspNetCore.Hosting;

namespace MedicineInventory.Api.Services;

public class SaleService : ISaleService
{
    private readonly string _filePath;
    private readonly IMedicineService _medicineService;

    public SaleService(IWebHostEnvironment env, IMedicineService medicineService)
    {
        _medicineService = medicineService;
        string dataFolder = Path.Combine(env.ContentRootPath, "Data");
        
        if (!Directory.Exists(dataFolder))
        {
            _ = Directory.CreateDirectory(dataFolder);
        }

        _filePath = Path.Combine(dataFolder, "sales.json");

        if (!File.Exists(_filePath))
        {
            File.WriteAllText(_filePath, "[]");
        }
    }

    private async Task<List<Sale>> ReadFile()
    {
        string json = await File.ReadAllTextAsync(_filePath);
        return string.IsNullOrWhiteSpace(json)
            ? []
            : JsonSerializer.Deserialize<List<Sale>>(json) ?? [];
    }

    private async Task SaveFile(List<Sale> sales)
    {
        string json = JsonSerializer.Serialize(
            sales, 
            new JsonSerializerOptions 
            { 
                WriteIndented = true 
            });
        await File.WriteAllTextAsync(_filePath, json);
    }

    public async Task<List<Sale>> GetAll()
    {
        return await ReadFile();
    }

    public async Task<bool> Add(SaleCreateDto saleDto)
    {
        var medicine = await _medicineService.GetById(saleDto.MedicineId);
        if (medicine == null || medicine.Quantity < saleDto.Quantity)
        {
            return false;
        }

        medicine.Quantity -= saleDto.Quantity;
        _ = await _medicineService.Update(medicine.Id, medicine);

        var sales = await ReadFile();
        var sale = new Sale
        {
            Id = Guid.NewGuid(),
            MedicineId = medicine.Id,
            MedicineName = medicine.FullName,
            Quantity = saleDto.Quantity,
            UnitPrice = medicine.Price,
            TotalPrice = medicine.Price * saleDto.Quantity,
            SaleDate = DateTime.Now
        };

        sales.Add(sale);
        await SaveFile(sales);
        return true;
    }
}
