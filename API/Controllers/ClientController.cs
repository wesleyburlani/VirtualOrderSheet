using API.Services;
using Microsoft.AspNetCore.Mvc;

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

        
    }
}