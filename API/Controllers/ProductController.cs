using System;
using System.Collections.Generic;
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
                return StatusCode(500, new ErrorResult(e.Message));
            }
        }

        // GET api/values/5
        [HttpGet("{referenceCode}")]
        public ActionResult<string> Get(string referenceCode)
        {
            try
            {
                return Ok(ProductService.GetProduct(referenceCode));
            }
            catch(ProductNotFoundException e)
            {
                return StatusCode(400, new ErrorResult(e.Message));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ErrorResult(e.Message));
            }
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
                return StatusCode(400, new ErrorResult(e.Message));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ErrorResult(e.Message));
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
                return StatusCode(400, new ErrorResult(e.Message));
            }
            catch(ProductNotFoundException e)
            {
                return StatusCode(404, new ErrorResult(e.Message));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ErrorResult(e.Message));
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
                return StatusCode(404, new ErrorResult(e.Message));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ErrorResult(e.Message));
            }
        }
    }
}
