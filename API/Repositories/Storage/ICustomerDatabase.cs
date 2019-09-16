using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using API.Models;

namespace API.Repositories.Storage
{
    public interface ICustomerDatabase
    {
         IEnumerable<Customer> GetCustomers();

         Customer GetCustomer(Expression<Func<Customer, bool>> filter);

         string DeleteCustomer(string cpf);

         Customer UpsertCustomer(Customer customer);
    }
}