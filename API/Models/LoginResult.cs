using Newtonsoft.Json;

namespace API.Models
{
    public class LoginResult
    {
        [JsonProperty("result")]
        public bool Result { get; set; }

        [JsonProperty("message")]
        public string Message{ get; set; }
    }
}