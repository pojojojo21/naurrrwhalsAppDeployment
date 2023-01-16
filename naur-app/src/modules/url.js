const rootURL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? `http://localhost:${process.env.REACT_APP_BACKEND_PORT || 80}`
  : '';

export default rootURL;
