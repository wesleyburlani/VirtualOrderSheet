using System;
using Newtonsoft.Json;

namespace API.Models
{
    public partial class OrderProduct
    {
        [JsonProperty("referenceCode")]
        public string ReferenceCode { get; set; }

        [JsonProperty("quantity")]
        public long Quantity { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("price")]
        public double Price{ get; set; }

        [JsonProperty("date_time")]
        public DateTime? DateTime { get; set; }
    }
}