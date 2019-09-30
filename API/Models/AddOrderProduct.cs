using Newtonsoft.Json;

namespace API.Models
{
    public class AddOrderProduct
    {
        [JsonProperty("productReferenceCode")]
        public string ProductReferenceCode { get; set; }

        [JsonProperty("quantity")]
        public long Quantity { get; set; }
    }
}