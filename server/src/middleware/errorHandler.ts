import {Request, Response, NextFunction} from 'express'
import { logEvents } from './logEvent'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logEvents(`${err.name}: ${err.message}`, 'errLog.txt')
  console.error(err.stack)
  res.status(500).send(err.message)
  /* 
    However, in a real-world application, you would probably want to avoid sending detailed error messages to the client in a production environment, as they could reveal sensitive information.

    res.status(500) returns an response object, and this object has a method send, and this this object calls send.

  The res object in Express.js is an instance of the http.ServerResponse class, augmented with numerous additional methods and properties to facilitate sending HTTP responses.

  The exact structure can depend on the specific middleware used in the application, as some middleware can add additional methods and properties to the res object.

  In Express.js, middleware can add additional properties and methods to the res object to extend its functionality. Here are a few examples:

Cookie Handling: Middleware like cookie-parser can augment the res object with methods like res.cookie(name, value, options), which allows you to set cookies in the response, and res.clearCookie(name, options), which allows you to clear a specific cookie.

Session Handling: Middleware like express-session can add a res.session property, which is an object that can contain any data you want to persist between requests from the same client.

View Rendering: Middleware like ejs, pug, or other view engines can add a res.render(view, locals, callback) method, which allows you to render a view template with specific local variables and send it as the HTTP response.

Response Time Tracking: Custom middleware can add properties like res.startTime to track when the response was started, for use in logging or performance monitoring.

Security Headers: Middleware like helmet helps secure Express apps by setting various HTTP headers, affecting the res object indirectly.

Caching: Middleware like apicache or express-redis-cache can add methods to control caching of the response.

Remember that any changes you make to the res object in middleware are available to subsequent middleware, routes, and error handlers. This allows middleware to communicate and share data with each other. However, you should be careful not to unintentionally overwrite existing properties or methods, or to add so much data to the object that it becomes difficult to manage.
  */
}

export default errorHandler