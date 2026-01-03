import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchApi } from '../../../core/api/search.api';
import { Trip } from '../../../shared/models/trip.model';
import { TripCardComponent } from '../components/trip-card/trip-card.component';

const MOCK_TRIPS: Trip[] = [
  { tripId: 101, busType: 'AC Sleeper', departureTime: '2025-12-30T04:00:00', arrivalTime: '2025-12-30T08:00:00', fare: 1250, availableSeats: 12 },
  { tripId: 102, busType: 'Luxury Semi-Sleeper', departureTime: '2025-12-30T02:00:00', arrivalTime: '2025-12-30T07:00:00', fare: 850, availableSeats: 5 }
];

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [CommonModule, TripCardComponent],
  providers: [SearchApi],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  trips = signal<Trip[]>(MOCK_TRIPS);
  loading = signal(false);
  searched = signal(false);

  constructor(private searchApi: SearchApi) {}

  search(source: string, destination: string, date: string) {
    if (!source){
       alert("please enter Source City Name")
      return;
    }
     if ( !destination){
       alert("please enter destination City Name")
      return;
    }
     if (!date){
       alert("please enter journey Date")
      return;
    }
     
    this.loading.set(true);
    this.searched.set(true);

    this.searchApi.searchTrips({ source, destination, date })
      .subscribe({
        next: (data) => this.trips.set(data),
        error: () => this.trips.set([]),
        complete: () => this.loading.set(false)
      });
  }


  
}
