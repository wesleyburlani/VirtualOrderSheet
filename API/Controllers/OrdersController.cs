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
    public class OrdersController : ControllerBase
    {
        public OrdersController(IOrderSheetService OrderSheetService)
        {
            this.OrderSheetService = OrderSheetService;
        }

        IOrderSheetService OrderSheetService { get; set; }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<OrderSheet>> Get(
            [FromQuery]string clientCpf = null, 
            [FromQuery]string status = null)
        {
            try
            {
                return Ok(OrderSheetService.GetOrdersSheet(filter: 
                    c => (c.ClientCpf == clientCpf || string.IsNullOrEmpty(clientCpf)) 
                    && (c.Status == status || string.IsNullOrEmpty(status))));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ErrorResult(e.Message));
            }
        }

        // GET api/values/5
        [HttpGet("{referenceCode}")]
        public ActionResult<OrderSheet> Get(string referenceCode)
        {
            try
            {
                return Ok(OrderSheetService.GetOrderSheet(referenceCode));
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
        public ActionResult<OrderSheet> Post([FromBody] OrderSheet OrderSheet)
        {
            try
            {
                return Ok(OrderSheetService.CreateOrderSheet(OrderSheet));
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
        public ActionResult<OrderSheet> Put(string referenceCode, [FromBody] OrderSheet OrderSheet)
        {
            try
            {
                return Ok(OrderSheetService.UpdateOrderSheet(referenceCode, OrderSheet));
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
    }
}