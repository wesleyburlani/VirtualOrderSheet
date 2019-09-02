using System;

namespace API.Exceptions
{
    public class ProductInconsistencyException : Exception
    {
        public ProductInconsistencyException(string message) : base(message)
        {
        }
    }
}