import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApi } from '../../../core/api/admin.api';

@Component({
  standalone: true,
  selector: 'app-admin-trips',
  imports: [CommonModule, ReactiveFormsModule ,FormsModule],
  providers: [AdminApi],
  templateUrl: './trips.component.html'
})
export class AdminTripsComponent {

 
  trips = signal<any[]>([
  {
    id: 1,
    routeId: "1", // New York to Philadelphia
    busId: "1",   // NYC-101
    departure: "2025-12-26",
    fare: 45.50
  },
  {
    id: 2,
    routeId: "2", // London to Manchester
    busId: "2",   // LON-505
    departure: "2025-12-26",
    fare: 28.00
  },
  {
    id: 3,
    routeId: "3", // Tokyo to Osaka
    busId: "3",   // TOK-99
    departure: "2025-12-26",
    fare: 110.00
  },
  {
    id: 4,
    routeId: "4", // Berlin to Munich
    busId: "4",   // BER-202
    departure: "2025-12-27",
    fare: 55.25
  },
  {
    id: 5,
    routeId: "5", // San Francisco to Los Angeles
    busId: "5",   // SFO-77
    departure: "2025-12-27",
    fare: 75.00
  }
]);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    id: [],
    routeId: ['', Validators.required],
    busId: ['', Validators.required],
    departure: ['', Validators.required],
    fare: [0, [Validators.required, Validators.min(1)]]
  });

  // UI State
  searchText = '';
  sortField: 'busId' | 'fare' | 'departureTime' | '' = '';
  sortAsc = true;
  page = 1;
  pageSize = 5;

  // Delete Modal
  showDeleteModal = false;
  deleteId!: number;

  constructor(private api: AdminApi) {
    this.load();
  }

  load() {
    this.api.getTrips().subscribe(t => this.trips.set(t));
  }

  edit(trip: any) {
    this.form.patchValue(trip);
  }

  save() {
    if (this.form.invalid) return;

    this.api.saveTrip(this.form.value).subscribe(() => {
      this.form.reset();
      this.load();
    });
  }

  openDelete(id: number) {
    this.deleteId = id;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    this.api.deleteTrip(this.deleteId).subscribe(() => {
      this.showDeleteModal = false;
      this.load();
    });
  }

  sort(field: 'busId' | 'fare' | 'departureTime') {
    this.sortAsc = this.sortField === field ? !this.sortAsc : true;
    this.sortField = field;
  }

  filteredTrips() {
    let data = [...this.trips()];

    // Search
    if (this.searchText) {
      data = data.filter(t =>
        String(t.routeId).includes(this.searchText) ||
        String(t.busId).includes(this.searchText)
      );
    }

    // Sort
    if (this.sortField) {
      data.sort((a, b) =>
        this.sortAsc
          ? a[this.sortField] > b[this.sortField] ? 1 : -1
          : a[this.sortField] < b[this.sortField] ? 1 : -1
      );
    }

    // Pagination
    const start = (this.page - 1) * this.pageSize;
    return data.slice(start, start + this.pageSize);
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }

  nextPage() {
    this.page++;
  }
/*
  constructor(
    private api: AdminApi,
    //private fb: FormBuilder
  ) {
    this.load();
  }

  load() {
    this.api.getTrips().subscribe(t => this.trips.set(t));
  }

  edit(trip: any) {
    this.form.patchValue(trip);
  }

  save() {
    this.api.saveTrip(this.form.value)
      .subscribe(() => {
        this.form.reset();
        this.load();
      });
  }

  delete(id: number) {
    this.api.deleteTrip(id).subscribe(() => this.load());
  }*/
}
