using System.Collections.Generic;
using API.Models;
using API.Repositories.Storage;
using API.Exceptions;
using System.Linq.Expressions;
using System;
using System.Security.Cryptography;
using System.Text;

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
            customer.Password = CalculateMD5Hash(customer.Password);
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

        public IEnumerable<Customer> GetCustomers(Expression<Func<Customer, bool>> filter)
        {
            IEnumerable<Customer> references = Database.GetCustomers(filter);
            return references;
        }

        public Customer UpdateCustomer(string cpf, Customer customer)
        {
            if(cpf != customer.Cpf)
                throw new CustomerInconsistencyException("Cpf é diferente do Cliente");
            Customer reference = Database.GetCustomer(c => c.Cpf == cpf);;
            if(reference == null)
                throw new CustomerNotFoundException("Cliente não existe");
            customer.Password = CalculateMD5Hash(customer.Password);
            return Database.UpsertCustomer(customer);
        }

        public LoginResult Login(Login login)
        {
            try
            {
                Customer customer = Database.GetCustomer(c =>
                        c.Cpf == login.EmailOrCpf || login.EmailOrCpf == c.Email); 
                if(customer == null)
                    throw new CustomerNotFoundException("Cliente não existe");

                if(customer.Password != CalculateMD5Hash(login.Password))
                    throw new Exception("Senha não bate com hash registrada");
                
                return new LoginResult(){Result=true};
            }
            catch(Exception e)
            {
                return new LoginResult(){Result=false, Message=e.Message};
            }
        }

        private string CalculateMD5Hash(string input)
        {
            MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
            byte[] hash = md5.ComputeHash(inputBytes);
        
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("X2"));
            }
            return sb.ToString();
        }
    }
}