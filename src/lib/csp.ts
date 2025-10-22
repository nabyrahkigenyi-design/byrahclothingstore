export const cspHeader =
  "default-src 'self'; " +
  "img-src 'self' https: data: https://maps.gstatic.com https://lh3.googleusercontent.com; " +
  "script-src 'self' 'unsafe-inline' https://checkout.flutterwave.com https://api.paystack.co; " +
  "connect-src 'self' https://api.flutterwave.com https://api.paystack.co; " +
  "style-src 'self' 'unsafe-inline'; " +
  "frame-src https://checkout.flutterwave.com https://paystack.com https://www.google.com; " +
  "child-src https://www.google.com;";
