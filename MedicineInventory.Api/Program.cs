using MedicineInventory.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSingleton<IMedicineService, MedicineService>();
builder.Services.AddSingleton<ISaleService, SaleService>();
builder.Services.AddCors(o => o.AddPolicy("AllowAnyOrigin",
         builder =>
         {
             _ = builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
         }));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowAnyOrigin");
app.MapControllers();

app.Run();

 