using System.Collections.Generic;
using API.Models;

namespace API.Repositories.Storage
{
    public class MockDatabase : IDatabase
    {
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
            return new List<Product>()
            {
                new Product()
                {
                    ReferenceCode = "abc",
                    Name = "produto 1"
                },
                new Product()
                {
                    ReferenceCode = "asd",
                    Name = "produto 2"
                }
            };
        }

        public Product UpsertProduct(Product product)
        {
            throw new System.NotImplementedException();
        }
    }
}