import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApi } from '../../../core/api/admin.api';

@Component({
  standalone: true,
  selector: 'app-admin-buses',
  imports: [CommonModule, ReactiveFormsModule ,FormsModule],
  providers: [AdminApi],
  templateUrl: './buses.component.html'
})
export class AdminBusesComponent {

  buses = signal<any[]>([
  {
    id: 1,
    busNumber: "NYC-101",
    type: "Luxury Sleeper",
    totalSeats: 32
  },
  {
    id: 2,
    busNumber: "LON-505",
    type: "Double Decker",
    totalSeats: 64
  },
  {
    id: 3,
    busNumber: "TOK-99",
    type: "Express Shuttler",
    totalSeats: 45
  },
  {
    id: 4,
    busNumber: "BER-202",
    type: "Electric Transit",
    totalSeats: 50
  },
  {
    id: 5,
    busNumber: "SFO-77",
    type: "Semi-Sleeper",
    totalSeats: 40
  }
]);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    id: [],
    busNumber: ['', Validators.required],
    type: ['', Validators.required],
    totalSeats: [0, [Validators.required, Validators.min(1)]]
  });

  // UI state
  searchText = '';
  sortField: 'busNumber' | 'totalSeats' | '' = '';
  sortAsc = true;
  page = 1;
  pageSize = 5;

  // Delete modal
  showDeleteModal = false;
  deleteId!: number;

  constructor(private api: AdminApi) {
    this.load();
  }

  load() {
    this.api.getBuses().subscribe(b => this.buses.set(b));
  }

  edit(bus: any) {
    this.form.patchValue(bus);
  }

  save() {
    if (this.form.invalid) return;

    this.api.saveBus(this.form.value)
      .subscribe(() => {
        this.form.reset();
        this.load();
      });
  }

  openDelete(id: number) {
    this.deleteId = id;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    this.api.deleteBus(this.deleteId)
      .subscribe(() => {
        this.showDeleteModal = false;
        this.load();
      });
  }

  sort(field: 'busNumber' | 'totalSeats') {
    this.sortAsc = this.sortField === field ? !this.sortAsc : true;
    this.sortField = field;
  }

  filteredBuses() {
    let data = [...this.buses()];

    // Search
    if (this.searchText) {
      data = data.filter(b =>
        b.busNumber.toLowerCase().includes(this.searchText.toLowerCase())
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
  }}
