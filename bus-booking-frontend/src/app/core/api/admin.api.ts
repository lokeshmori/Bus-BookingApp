import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

const API_BASE_URL = 'http://localhost:8080/api/admin';

export class AdminApi {
  private http = inject(HttpClient);

  // ROUTES
  getRoutes() {
    return this.http.get<any[]>(`${API_BASE_URL}/routes`);
  }

  saveRoute(route: any) {
    return this.http.post(`${API_BASE_URL}/routes`, route);
  }

  deleteRoute(id: number) {
    return this.http.delete(`${API_BASE_URL}/routes/${id}`);
  }

  // BUSES
  getBuses() {
    return this.http.get<any[]>(`${API_BASE_URL}/buses`);
  }

  saveBus(bus: any) {
    return this.http.post(`${API_BASE_URL}/buses`, bus);
  }

  deleteBus(id: number) {
    return this.http.delete(`${API_BASE_URL}/buses/${id}`);
  }

  // TRIPS
  getTrips() {
    return this.http.get<any[]>(`${API_BASE_URL}/trips`);
  }

  saveTrip(trip: any) {
    return this.http.post(`${API_BASE_URL}/trips`, trip);
  }

  deleteTrip(id: number) {
    return this.http.delete(`${API_BASE_URL}/trips/${id}`);
  }
  
  saveSeatLayout(busId: number, layout: any) {
  return this.http.post(
    `${API_BASE_URL}/buses/${busId}/seat-layout`,
    layout
  );
}

}
