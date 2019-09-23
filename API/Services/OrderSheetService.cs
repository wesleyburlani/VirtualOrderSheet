namespace API.Services
{
    public class OrderSheetService : IOrderSheetService
    {
        public OrderSheetService(IOrderSheetDatabase Database)
        {
            this.Database = Database;
        }

        IOrderSheetDatabase Database { get; set; }

        IEnumerable<OrderSheet> GetOrdersSheet(Expression<Func<OrderSheet, bool>> filter)
        {

        }

        OrderSheet CreateOrderSheet(OrderSheet orderSheet)
        {

        }

        OrderSheet GetOrderSheet(string referenceCode)
        {

        }

        OrderSheet UpdateOrderSheet(string referenceCode, OrderSheet orderSheet)
        {

        }
    }
}