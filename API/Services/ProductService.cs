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
                throw new ProductAlreadyExistsException("Já existe um produto com esse reference code");
            return Database.UpsertProduct(product);
        }

        public string DeleteProduct(string referenceCode)
        {
            Product reference = Database.GetProduct(referenceCode);
            if(reference == null)
                throw new ProductNotFoundException("Produto não existe");
            return Database.DeleteProduct(referenceCode);
        }

        public Product GetProduct(string referenceCode)
        {
            Product reference = Database.GetProduct(referenceCode);
            if(reference == null)
                throw new ProductNotFoundException("Produto não existe");
            return reference;
        }

        public IEnumerable<Product> GetProducts()
        {
            return Database.GetProducts();
        }
        public Product UpdateProduct(string referenceCode, Product product)
        {
            if(referenceCode != product.ReferenceCode)
                throw new ProductInconsistencyException("Reference Code é diferente do Produto");
            Product reference = Database.GetProduct(referenceCode);
            if(reference == null)
                throw new ProductNotFoundException("Produto não existe");
            return Database.UpsertProduct(product);
        }
    }
}