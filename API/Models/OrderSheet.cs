using System;
using System.Collections.Generic;
using System.Globalization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace API.Models
{
    public partial class OrderSheet
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonIgnoreIfDefault]
        [JsonIgnore]
        public ObjectId Id { get; set; }

        [JsonProperty("referenceCode")]
        public string ReferenceCode { get; set; }

        [JsonProperty("client_cpf")]
        public string ClientCpf { get; set; }

        [JsonProperty("created_date")]
        public DateTime? CreatedDate { get; set; }

        [JsonProperty("finished_date")]
        public DateTime? FinishedDate { get; set; }

        [JsonProperty("status")]
        [JsonConverter(typeof(StringEnumConverter))]
        public OrderSheetStatus Status { get; set; }

        [JsonProperty("products")]
        public List<OrderProduct> Products { get; set; }
        
        
    }
}