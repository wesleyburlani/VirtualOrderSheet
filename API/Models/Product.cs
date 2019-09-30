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
    public partial class Product
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonIgnoreIfDefault]
        [JsonIgnore]
        public ObjectId Id { get; set; }

        [JsonProperty("referenceCode")]
        public string ReferenceCode { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("price")]
        public double Price { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("keywords")]
        public List<string> Keywords { get; set; }
    }
}