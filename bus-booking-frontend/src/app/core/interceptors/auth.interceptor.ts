import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "../auth/token.service";
import { catchError } from "rxjs/internal/operators/catchError";
import { throwError } from "rxjs/internal/observable/throwError";
import { switchMap } from "rxjs/internal/operators/switchMap";

@Injectable()
export class  authInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = this.tokenService.getAccessToken();

    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          return this.refreshTokenAndRetry(req, next);
        }
        return throwError(() => err);
      })
    );
  }

  private refreshTokenAndRetry(
    req: HttpRequest<any>,
    next: HttpHandler
  ) {
    const refreshToken = this.tokenService.getRefreshToken();

    return this.http.post<any>(
      '/api/auth/refresh',
      { refreshToken }
    ).pipe(
      switchMap(res => {
        this.tokenService.setTokens(
          res.accessToken,
          res.refreshToken
        );
        return next.handle(req);
      })
    );
  }
}
