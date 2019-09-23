using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using API.Models;
using API.Repositories.Storage;

namespace API.Services
{
    public class OrderSheetService : IOrderSheetService
    {
        public OrderSheetService(IOrderSheetDatabase Database)
        {
            
        }

        public OrderSheet CreateOrderSheet(OrderSheet orderSheet)
        {
            throw new NotImplementedException();
        }

        public OrderSheet GetOrderSheet(string referenceCode)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<OrderSheet> GetOrdersSheet(Expression<Func<OrderSheet, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public OrderSheet UpdateOrderSheet(string referenceCode, OrderSheet orderSheet)
        {
            throw new NotImplementedException();
        }
    }
}