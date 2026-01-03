import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Trip } from '../../shared/models/trip.model';
import { environment } from '../../../environments/environments';

const API_BASE_URL = environment.apiUrl ;

export class SearchApi {
  private http = inject(HttpClient);

  searchTrips(params: {
    source: string;
    destination: string;
    date: string;
  }) {
    return this.http.get<Trip[]>(
      `${API_BASE_URL}/search/trips`,
      { params }
    );
  }
}
