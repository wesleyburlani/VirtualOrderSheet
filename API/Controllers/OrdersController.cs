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
    public class OrderController : ControllerBase
    {
        public OrderController(IOrderSheetService OrderSheetService)
        {
            this.OrderSheetService = OrderSheetService;
        }

        IOrderSheetService OrderSheetService { get; set; }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<OrderSheet>> GetList(
            [FromQuery]string clientCpf = null, 
            [FromQuery]OrderSheetStatus? status = null)
        {
            try
            {
                return Ok(OrderSheetService.GetOrdersSheet(filter: 
                    c => (c.Client.Cpf == clientCpf || string.IsNullOrEmpty(clientCpf)) 
                    && (c.Status == status || status == null)));
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
            catch(OrderSheetNotFoundException e)
            {
                return StatusCode(400, new ErrorResult(e.Message));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ErrorResult(e.Message));
            }
        }

        // POST api/values
        [HttpPost("open")]
        public ActionResult<OrderSheet> Post([FromBody] OrderSheetCreate orderSheetCpf)
        {
            try
            {
                var orderSheet = new OrderSheet{ Client = new Customer{ Cpf = orderSheetCpf.ClientCpf } };
                return Ok(OrderSheetService.OpenOrderSheet(orderSheet));
            }
            catch(OrderSheetAlreadyExistsException e)
            {
                return StatusCode(400, new ErrorResult(e.Message));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ErrorResult(e.Message));
            }
        }

        // PUT api/values/5
        [HttpPut("{referenceCode}/addproduct")]
        public ActionResult<OrderSheet> Put(string referenceCode, [FromBody] IEnumerable<AddOrderProduct> orderProducts)
        {
            try
            {

                return Ok(OrderSheetService.AddProducts(referenceCode, orderProducts));
            }
            catch(OrderSheetInconsistencyException e)
            {
                return StatusCode(400, new ErrorResult(e.Message));
            }
            catch(OrderSheetNotFoundException e)
            {
                return StatusCode(404, new ErrorResult(e.Message));
            }
            catch(Exception e)
            {
                return StatusCode(500, new ErrorResult(e.Message));
            }
        }

        [HttpPut("{referenceCode}/close")]
        public ActionResult<OrderSheet> CloseOrder(string referenceCode)
        {
            try
            {
                return Ok(OrderSheetService.CloseOrderSheet(referenceCode));
            }
            catch(OrderSheetInconsistencyException e)
            {
                return StatusCode(400, new ErrorResult(e.Message));
            }
            catch(OrderSheetNotFoundException e)
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