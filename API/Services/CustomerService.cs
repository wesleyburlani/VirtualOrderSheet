using System.Collections.Generic;
using API.Models;
using API.Repositories.Storage;
using API.Exceptions;

namespace API.Services
{
    public class CustomerService : ICustomerService
    {

        public CustomerService(ICustomerDatabase Database)
        {
            this.Database = Database;
        }

        ICustomerDatabase Database { get; set; }

        public Customer CreateCustomer(Customer customer)
        {
            Customer reference = Database.GetCustomer(c => c.Cpf == customer.Cpf);
            if(reference != null)
                throw new CustomerAlreadyExistsException("Já existe um cliente com esse CPF");
            return Database.UpsertCustomer(customer);
        }

        public string DeleteCustomer(string cpf)
        {
            Customer reference = Database.GetCustomer(c => c.Cpf == cpf);
            if(reference == null)                
                throw new CustomerNotFoundException("Cliente não existe");
            return Database.DeleteCustomer(cpf);
        }

        public Customer GetCustomer(string cpf)
        {
            Customer reference = Database.GetCustomer(c => c.Cpf == cpf);
            if(reference == null)
                throw new CustomerNotFoundException("Cliente não existe");
            return reference;
        }

        public IEnumerable<Customer> GetCustomers(Customer customer)
        {
            Customer reference = Database.GetCustomer(null);
            return null;

        }

        public Customer UpdateCustomer(string cpf, Customer customer)
        {
            if(cpf != customer.Cpf)
                throw new CustomerInconsistencyException("Cpf é diferente do Cliente");
            Customer reference = Database.GetCustomer(c => c.Cpf == cpf);;
            if(reference == null)
                throw new CustomerNotFoundException("Cliente não existe");
            return Database.UpsertCustomer(customer);
        }
    }
}