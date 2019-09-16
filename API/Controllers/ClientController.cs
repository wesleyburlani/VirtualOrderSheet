using System;
using System.Collections.Generic;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using API.Exceptions;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        public ClientController(ICustomerService customerService)
        {
            CustomerService = customerService;
        }

        ICustomerService CustomerService { get; set; }

        [HttpGet]
        public ActionResult<IEnumerable<Customer>> Get([FromRoute]string name, [FromRoute]string email)
        {
            try
            {
                Customer customer = new Customer();
                if(string.IsNullOrEmpty(name) == false)
                    customer.Name = name;
                if(string.IsNullOrEmpty(email) == false)
                    customer.Email = email;

                return Ok(CustomerService.GetCustomers(customer));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ErrorResult(e.Message));
            }
        }

        [HttpGet("{cpf}")]
        public ActionResult<Customer> Get(string cpf)
        {
            try
            {
                return Ok(CustomerService.GetCustomer(cpf));
            }
            catch(CustomerNotFoundException e)
            {
                return StatusCode(400, new ErrorResult(e.Message));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ErrorResult(e.Message));
            }
        }

        [HttpPost]
        public ActionResult<Customer> Post([FromBody] Customer customer)
        {
            try
            {
                return Ok(CustomerService.CreateCustomer(customer));
            }
            catch(CustomerAlreadyExistsException e)
            {
                return StatusCode(400, new ErrorResult(e.Message));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ErrorResult(e.Message));
            }
        }

        [HttpPut("{cpf}")]
        public ActionResult<Customer> Put(string cpf, [FromBody] Customer customer)
        {
            try
            {
                return Ok(CustomerService.UpdateCustomer(cpf, customer));
            }
            catch(CustomerInconsistencyException e)
            {
                return StatusCode(400, new ErrorResult(e.Message));
            }
            catch(CustomerNotFoundException e)
            {
                return StatusCode(404, new ErrorResult(e.Message));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ErrorResult(e.Message));
            }
        }

        [HttpDelete("{cpf}")]
        public ActionResult<Customer> Delete(string cpf)
        {
            try
            {
                return Ok(CustomerService.DeleteCustomer(cpf));
            }
            catch(CustomerNotFoundException e)
            {
                return StatusCode(404, new ErrorResult(e.Message));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ErrorResult(e.Message));
            }
        }
    }
}