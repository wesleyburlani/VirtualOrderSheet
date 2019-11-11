using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using Newtonsoft.Json;

namespace API.Models
{
    public partial class CreditCard
    {
        
        [JsonProperty("card_number")]
        public string CardNumber { get; set; }

        [JsonProperty("expiring_date")]
        public string ExpiringDate { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("last_name")]
        public string LastName { get; set; }

        [JsonProperty("cpf_holder")]
        public string CpfHolder { get; set; }

    }
}