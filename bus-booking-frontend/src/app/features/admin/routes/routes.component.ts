import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApi } from '../../../core/api/admin.api';
import { Route } from '@angular/router';


  


@Component({
  standalone: true,
  selector: 'app-admin-routes',
  imports: [CommonModule, ReactiveFormsModule , FormsModule],
  providers: [AdminApi],
  templateUrl: './routes.component.html'
})
export class AdminRoutesComponent {

  routes = signal<any[]>([
  {
    id: 1,
    source: "New York",
    destination: "Boston",
    distanceKm: 346.5
  },
  {
    id: 2,
    source: "Los Angeles",
    destination: "San Francisco",
    distanceKm: 615.2
  }]);
  editing = signal(false);
private fb = inject(FormBuilder);
form = this.fb.group({
    source: ['', Validators.required],
    destination: ['', Validators.required],
    distanceKm: [0, [Validators.required, Validators.min(1)]]
  });
 
  constructor(
    private api: AdminApi,
   // private fb: FormBuilder
  ) {
    this.load();
  }

  load() {
    this.api.getRoutes().subscribe(r => this.routes.set(r));
  }
/*
  edit(route: any) {
    this.editing.set(true);
    this.form.patchValue(route);
  }

  save() {
    this.api.saveRoute(this.form.value)
      .subscribe(() => {
        this.form.reset();
        this.editing.set(false);
        this.load();
      });
  } */

  delete(id: number) {
    this.api.deleteRoute(id).subscribe(() => this.load());
  }


  searchText = '';
  page = 1;
  sortField = '';
  sortAsc = true;

  showDeleteModal = false;
  deleteId!: number;

  save() {
    if (this.form.invalid) return;
    // create / update logic
    this.form.reset();
    this.editing.set(false);
  }

  edit(route: any) {
    this.form.patchValue(route);
    this.editing.set(true);
  }

  openDelete(id: number) {
    this.deleteId = id;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    // delete API
    this.showDeleteModal = false;
  }

  sort(field: string) {
    this.sortAsc = this.sortField === field ? !this.sortAsc : true;
    this.sortField = field;
  }

  filteredRoutes() {
    return this.routes();
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }

  nextPage() {
    this.page++;
  }

}
