using System.Collections.Generic;
using API.Models;

namespace API.Services
{
    public class CustomerService : ICustomerService
    {
        public Customer CreateCustomer(Customer Customer)
        {
            Customer cpf = Database.GetCustomer()
            throw new System.NotImplementedException();

            if(reference != null)
                throw new ProductAlreadyExistsException("Já existe um produto com esse reference code");
            return Database.UpsertProduct(product);
        }

        public string DeleteCustomer(string referenceCode)
        {
            throw new System.NotImplementedException();
        }

        public Customer GetCustomer(string referenceCode)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomers()
        {
            throw new System.NotImplementedException();
        }

        public Customer UpdateCustomer(Customer Customer)
        {
            throw new System.NotImplementedException();
        }
    }
}