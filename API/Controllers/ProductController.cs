using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using API.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public ProductController(IProductService ProductService)
        {
            this.ProductService = ProductService;
        }

        IProductService ProductService { get; set; }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Product>> Get()
        {
            try
            {
                return Ok(ProductService.GetProducts());
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public ActionResult<string> Post([FromBody] Product product)
        {
            try
            {
                return Ok(ProductService.CreateProduct(product));
            }
            catch(ProductAlreadyExistsException e)
            {
                return StatusCode(400, e.Message);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // PUT api/values/5
        [HttpPut("{referenceCode}")]
        public ActionResult<string> Put(string referenceCode, [FromBody] Product product)
        {
            try
            {
                return Ok(ProductService.UpdateProduct(referenceCode, product));
            }
            catch(ProductInconsistencyException e)
            {
                return StatusCode(400, e.Message);
            }
            catch(ProductAlreadyExistsException e)
            {
                return StatusCode(400, e.Message);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // DELETE api/values/5
        [HttpDelete("{referenceCode}")]
        public ActionResult<string> Delete(string referenceCode)
        {
            try
            {
                return Ok(ProductService.DeleteProduct(referenceCode));
            }
            catch(ProductNotFoundException e)
            {
                return StatusCode(404, e.Message);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
