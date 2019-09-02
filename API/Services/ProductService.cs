using System.Collections.Generic;
using API.Exceptions;
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

        public Product CreateProduct(Product product)
        {
            Product reference = Database.GetProduct(product.ReferenceCode);
            if(reference != null)
                throw new CreateProductException("Já existe um produto com esse reference code");
            return Database.UpsertProduct(product);
        }

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

        public Product UpdateProduct(Product product)
        {
            throw new System.NotImplementedException();
        }
    }
}