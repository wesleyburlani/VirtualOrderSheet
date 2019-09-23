using System;

namespace API.Exceptions
{
    public class OrderSheetAlreadyExistsException : Exception
    {
        public OrderSheetAlreadyExistsException(string message) : base(message)
        {
        }
    }
}