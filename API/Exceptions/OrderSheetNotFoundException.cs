using System;

namespace API.Exceptions
{
    public class OrderSheetNotFoundException : Exception
    {
        public OrderSheetNotFoundException(string message) : base(message)
        {
        }
    }
}