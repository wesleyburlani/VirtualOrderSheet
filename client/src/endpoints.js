const is_dev = process.env.NODE_ENV === 'development'

export const api = is_dev ? 'http://localhost:5000/api' : '/api'