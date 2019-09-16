using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using API.Models;
using MongoDB.Driver;

namespace API.Repositories.Storage
{
    public class MongoDatabase : IProductDatabase, ICustomerDatabase
    {
        IMongoClient MongoClient;

        public MongoDatabase(IMongoClient mongoClient)
        {
            this.MongoClient = mongoClient;
        }

        public string DeleteCustomer(string cpf)
        {
            throw new NotImplementedException();
        }

        public string DeleteProduct(string referenceCode)
        {
            GetProductsCollection().DeleteOne<Product>(p => p.ReferenceCode == referenceCode);
            return referenceCode;
        }

        public Customer GetCustomer(Expression<Func<Customer, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomers()
        {
            throw new NotImplementedException();
        }

        public Product GetProduct(string referenceCode)
        {
            return GetProductsCollection().Find<Product>(
                p => p.ReferenceCode == referenceCode
            ).Limit(1).ToList().FirstOrDefault();
        }

        public IEnumerable<Product> GetProducts()
        {
            return GetProductsCollection().Find<Product>(_ => true).ToList();
        }

        public Customer UpsertCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }

        public Product UpsertProduct(Product product)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.ReferenceCode, product.ReferenceCode);
            return GetProductsCollection().FindOneAndReplace<Product>(filter, product,
                new FindOneAndReplaceOptions<Product, Product>() { IsUpsert = true });
        }

        private IMongoCollection<Product> GetProductsCollection()
        {
            return MongoClient.GetDatabase("virtualOrderSheet")
                .GetCollection<Product>("products");
        }
        
        private IMongoCollection<Customer> GetCustomersCollection()
        {
            return MongoClient.GetDatabase("virtualOrderSheet")
                .GetCollection<Customer>("cutomers");
        }
    }
}