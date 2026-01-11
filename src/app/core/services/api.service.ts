import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * ApiService
 * 
 * Base service for API calls. Can be extended for specific endpoints.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/api'; // Base API URL

  constructor(private http: HttpClient) {}

  /**
   * Generic GET request
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`);
  }

  /**
   * Generic POST request
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data);
  }

  /**
   * Generic PUT request
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data);
  }

  /**
   * Generic DELETE request
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }
}



