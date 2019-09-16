using System.Collections.Generic;
using API.Models;

namespace API.Services
{
    public interface ICustomerService
    {
        IEnumerable<Customer> GetCustomers(Customer customer);

        Customer GetCustomer(string cpf);

        Customer CreateCustomer(Customer customer);

        Customer UpdateCustomer(string cpf, Customer customer);   

        string DeleteCustomer(string cpf);
    }
}