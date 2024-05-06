import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    req = req.clone({
      url: environment.BASEURL + req.url,
      setHeaders: {
        'Authorization': `${token}`
      }
    })
  } else {
    req = req.clone({
      url: environment.BASEURL + req.url,
    })
  }
  return next(req);
};
