using System;

namespace API.Exceptions

{
    public class CustomerInconsistencyException : Exception
    {
        public CustomerInconsistencyException(string message) : base(message)
        {
        }
    }
}