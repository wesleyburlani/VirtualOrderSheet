using System.Collections.Generic;
using API.Models;
using API.Repositories.Storage;

namespace API.Services
{
    public interface IProductService
    {
        IEnumerable<Product> GetProducts();

        Product GetProduct(string referenceCode);

        Product CreateProduct(Product product);   

        Product UpdateProduct(string referenceCode,Product product);   

        string DeleteProduct(string referenceCode);
    }
}