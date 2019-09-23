using System;

namespace API.Exceptions
{
    public class OrderSheetInconsistencyException : Exception
    {
        public OrderSheetInconsistencyException(string message) : base(message)
        {
        }
    }
}