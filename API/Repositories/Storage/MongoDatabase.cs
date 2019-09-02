using System.Collections.Generic;
using System.Linq;
using API.Models;
using MongoDB.Driver;

namespace API.Repositories.Storage
{
    public class MongoDatabase : IDatabase
    {
        IMongoClient MongoClient;

        public MongoDatabase(IMongoClient mongoClient)
        {
            this.MongoClient = mongoClient;
        }

        public string DeleteProduct(string referenceCode)
        {
            GetProductsCollection().DeleteOne<Product>(p => p.ReferenceCode == referenceCode);
            return referenceCode;
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

        public Product UpsertProduct(Product product)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.ReferenceCode, product.ReferenceCode);
            return GetProductsCollection().FindOneAndReplace<Product>(
                filter, product, new FindOneAndReplaceOptions<Product, Product>(){ IsUpsert = true} );
        }

        private IMongoCollection<Product> GetProductsCollection()
        {
            return MongoClient.GetDatabase("products").GetCollection<Product>("products");
        }
    }
}