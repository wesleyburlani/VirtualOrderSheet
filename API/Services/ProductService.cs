using System.Collections.Generic;
using API.Models;
using API.Repositories.Storage;

namespace API.Services
{
    public class ProductService : IProductService
    {
        public ProductService(IDatabase Database)
        {
            this.Database = Database;
        }

        IDatabase Database { get; set; }

        public string DeleteProduct(string referenceCode)
        {
            throw new System.NotImplementedException();
        }

        public Product GetProduct(string referenceCode)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Product> GetProducts()
        {
            return Database.GetProducts();
        }

        public Product UpsertProduct(Product product)
        {
            throw new System.NotImplementedException();
        }
    }
}