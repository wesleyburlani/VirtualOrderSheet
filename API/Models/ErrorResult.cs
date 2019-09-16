using Newtonsoft.Json;

namespace API.Models
{
    public class ErrorResult
    {
        public ErrorResult(string message)
        {
            Message = message;
        }

        [JsonProperty("message")]
        public string Message { get; set; }
    }
}