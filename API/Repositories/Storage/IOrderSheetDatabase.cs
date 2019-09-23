using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using API.Models;

namespace API.Repositories.Storage
{
    public interface IOrderSheetDatabase
    {
        IEnumerable<OrderSheet> GetOrderSheets(Expression<Func<OrderSheet, bool>> filter);

        OrderSheet GetOrderSheet(Expression<Func<OrderSheet, bool>> filter);

        OrderSheet UpsertOrderSheet(OrderSheet OrderSheet);
    }
}