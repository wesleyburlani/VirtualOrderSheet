using System;

namespace API.Exceptions
{
    public class CreateProductException : Exception
    {
        public CreateProductException(string message) : base(message)
        {
        }
    }
}