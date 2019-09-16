using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using API.Models;

namespace API.Services
{
    public interface ICustomerService
    {
        IEnumerable<Customer> GetCustomers(Expression<Func<Customer, bool>> filter);

        Customer GetCustomer(string cpf);

        Customer CreateCustomer(Customer customer);

        Customer UpdateCustomer(string cpf, Customer customer);   

        string DeleteCustomer(string cpf);
    }
}