using System.Collections.Generic;
using API.Models;

namespace API.Repositories.Storage
{
    public interface IDatabase
    {
        IEnumerable<Product> GetProducts();

        Product GetProduct(string referenceCode);

        Product UpsertProduct(Product product);   

        string DeleteProduct(string referenceCode);
    }
}