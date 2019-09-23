using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using API.Models;

namespace API.Services
{
    public interface IOrderSheetService
    {
        IEnumerable<OrderSheet> GetOrdersSheet(Expression<Func<OrderSheet, bool>> filter);

        OrderSheet CreateOrderSheet(OrderSheet orderSheet);

        OrderSheet GetOrderSheet(string referenceCode);

        OrderSheet UpdateOrderSheet(string referenceCode, OrderSheet orderSheet);
    }
}