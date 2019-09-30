using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using API.Models;
using MongoDB.Driver;

namespace API.Repositories.Storage
{
    public class MongoDatabase : IProductDatabase, ICustomerDatabase, IOrderSheetDatabase
    {
        IMongoClient MongoClient;

        public MongoDatabase(IMongoClient mongoClient)
        {
            this.MongoClient = mongoClient;
        }

        public string DeleteCustomer(string cpf)
        {
            GetCustomersCollection().DeleteOne<Customer>(c => c.Cpf == cpf);
            return cpf;
        }

        public string DeleteProduct(string referenceCode)
        {
            GetProductsCollection().DeleteOne<Product>(p => p.ReferenceCode == referenceCode);
            return referenceCode;
        }

        public Customer GetCustomer(Expression<Func<Customer, bool>> filter)
        {
            return GetCustomersCollection().Find<Customer>(
                filter
            ).Limit(1).ToList().FirstOrDefault();
        }

        public IEnumerable<Customer> GetCustomers(Expression<Func<Customer, bool>> filter)
        {
            return GetCustomersCollection().Find<Customer>(filter).ToList();
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
            var filter = Builders<Customer>.Filter.Eq(c => c.Cpf, customer.Cpf);
            return GetCustomersCollection().FindOneAndReplace<Customer>(filter, customer,
                new FindOneAndReplaceOptions<Customer, Customer>(){ IsUpsert = true , 
                ReturnDocument = ReturnDocument.After});
        }

        public Product UpsertProduct(Product product)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.ReferenceCode, product.ReferenceCode);
            return GetProductsCollection().FindOneAndReplace<Product>(filter, product,
                new FindOneAndReplaceOptions<Product, Product>() { IsUpsert = true , 
                ReturnDocument = ReturnDocument.After});
        }

        public IEnumerable<OrderSheet> GetOrderSheets(Expression<Func<OrderSheet, bool>> filter)
        {
            return GetOrderSheetsCollection().Find<OrderSheet>(filter).ToList();
        }

        public OrderSheet GetOrderSheet(Expression<Func<OrderSheet, bool>> filter)
        {
            return GetOrderSheetsCollection().Find<OrderSheet>(
                filter
            ).Limit(1).ToList().FirstOrDefault();
        }

        public OrderSheet UpsertOrderSheet(OrderSheet orderSheet)
        {
            var filter = Builders<OrderSheet>.Filter.Eq(p => p.ReferenceCode, orderSheet.ReferenceCode);
            return GetOrderSheetsCollection().FindOneAndReplace<OrderSheet>(filter, orderSheet,
                new FindOneAndReplaceOptions<OrderSheet, OrderSheet>() { IsUpsert = true, 
                ReturnDocument = ReturnDocument.After });
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

        private IMongoCollection<OrderSheet> GetOrderSheetsCollection()
        {
            return MongoClient.GetDatabase("virtualOrderSheet")
                .GetCollection<OrderSheet>("orderSheets");
        }
    }
}