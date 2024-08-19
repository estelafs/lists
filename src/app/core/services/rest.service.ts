import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Shared service to handle REST requests
 */
@Injectable({
  providedIn: 'root'
})
export class RestService {
  /** Headers request */
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  /** Request result */
  private result: unknown = undefined;

  constructor(
    private httpClient: HttpClient,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Create Http GET request.
   *
   * @param path the url path.
   * @returns Http GET request.
   */
  public get(path: string): unknown {
    return firstValueFrom(this.httpClient.get(path, this.httpOptions))
      .then((value) => {
        this.result = value;
        return value;
      })
      .catch((error) => {
        this.handleError(error);
      }).finally(() => {
        return this.result;
      });
  }

  /**
   * Create Http POST request
   *
   * @param path the url path.
   * @param body the body of the Http POST request.
   * @returns Http POST request.
   */
  public post(path: string, body: unknown): unknown {
    return firstValueFrom(this.httpClient.post(path, body, this.httpOptions))
      .then((value) => {
        this.result = value;
        return value;
      })
      .catch((error) => {
        this.handleError(error);
      }).finally(() => {
        return this.result;
      });
  }

  /**
   * Create Http PUT request
   *
   * @param path the url path.
   * @param body the body of the Http PUT request.
   * @returns Http PUT request.
   */
  public put(path: string, body: unknown): unknown {
    return firstValueFrom(this.httpClient.put(path, body, this.httpOptions))
    .then((value) => {
        this.result = value;
        return value;
      })
      .catch((error) => {
        this.handleError(error);
      }).finally(() => {
        return this.result;
      });
  }

  /**
   * Create Http DELETE request
   *
   * @param path the url path.
   * @returns Http DELETE request.
   */
  public delete(path: string): unknown {
    return firstValueFrom(this.httpClient.delete(path, this.httpOptions))
    .then((value) => {
        this.result = value;
        return value;
      })
      .catch((error) => {
        this.handleError(error);
      }).finally(() => {
        return this.result;
      });
  }

  /**
   * Handle request errors
   *
   * @param error error raised
   */
  public handleError(error: HttpErrorResponse): void {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error on client side
      errorMessage = error.error.message;
    } else {
      // Error on server side
      errorMessage = `Error code: ${error.status}, ` + `message: ${error.message}`;
    }
    console.log(errorMessage);
    // throw new Error(errorMessage);
  }
}
