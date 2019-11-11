using Newtonsoft.Json;

namespace API.Models
{
    public class Login
    {
        [JsonProperty("email_cpf")]
        public string EmailOrCpf { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }
    }
}