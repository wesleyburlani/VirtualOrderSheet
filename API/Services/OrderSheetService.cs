using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using API.Exceptions;
using API.Models;
using API.Repositories.Storage;

namespace API.Services
{
    public class OrderSheetService : IOrderSheetService
    {
        public OrderSheetService(IOrderSheetDatabase Database)
        {
            this.Database = Database; 
        }
        IOrderSheetDatabase Database { get; set; }

        public OrderSheet OpenOrderSheet(OrderSheet orderSheet)
        {
            OrderSheet reference = Database.GetOrderSheet(o => o.Status == OrderSheetStatus.open 
            && o.ClientCpf == orderSheet.ClientCpf);
            if(reference != null)
                throw new OrderSheetAlreadyExistsException("Esse cliente já possui uma comanda em aberto");
            orderSheet.ReferenceCode = Base64Encode(orderSheet.ClientCpf+DateTime.Now.ToString());
            orderSheet.CreatedDate = DateTime.Now;
            orderSheet.Status = OrderSheetStatus.open;
            orderSheet.FinishedDate = null;
            orderSheet.Products = new List<OrderProduct>();
            return Database.UpsertOrderSheet(orderSheet);
        }

        public OrderSheet CloseOrderSheet(string referenceCode)
        {
            OrderSheet reference = Database.GetOrderSheet(r => r.ReferenceCode == referenceCode);
            if(reference == null)
                throw new OrderSheetNotFoundException("Comanada não encontrada");
            reference.FinishedDate = DateTime.Now;
            reference.Status = OrderSheetStatus.closed;
            return Database.UpsertOrderSheet(reference);
        }

        public OrderSheet GetOrderSheet(string referenceCode)
        {
            OrderSheet reference = Database.GetOrderSheet(r => r.ReferenceCode == referenceCode);
            if(reference == null)
                throw new OrderSheetNotFoundException("Comanada não encontrada");
            return reference;
        }

        public IEnumerable<OrderSheet> GetOrdersSheet(Expression<Func<OrderSheet, bool>> filter)
        {
            IEnumerable<OrderSheet> references = Database.GetOrderSheets(filter);
            return references;
        }

        public OrderSheet AddProducts(string referenceCode, IEnumerable<OrderProduct> products)
        {
            OrderSheet reference = Database.GetOrderSheet(r => r.ReferenceCode == referenceCode);;
            if(reference == null)
                throw new OrderSheetNotFoundException("Comanda não encontrada");
            foreach(var p in products)
                p.DateTime = DateTime.Now;
            reference.Products.AddRange(products);
            return Database.UpsertOrderSheet(reference);
        }

        public static string Base64Encode(string plainText) {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
        public static string Base64Decode(string base64EncodedData) {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }  
    }
}