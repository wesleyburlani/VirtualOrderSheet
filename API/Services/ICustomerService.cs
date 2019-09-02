using System.Collections.Generic;
using API.Models;

namespace API.Services
{
    public interface ICustomerService
    {
        IEnumerable<Customer> GetCustomers();

        Customer GetCustomer(string referenceCode);

        Customer CreateCustomer(Customer Customer);   

        Customer UpdateCustomer(Customer Customer);   

        string DeleteCustomer(string referenceCode);
    }
}