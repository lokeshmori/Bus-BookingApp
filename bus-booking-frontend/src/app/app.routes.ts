import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component')
        .then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/search/search/search.component')
            .then(m => m.SearchComponent)
      },
      {
        path: 'seats/:tripId',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/seat-selection/seat-selection/seat-selection.component')
            .then(m => m.SeatSelectionComponent)
      },{
  path: 'bookings',
  canActivate: [AuthGuard],
  loadComponent: () =>
    import('./features/booking//my-bookings/my-bookings.component')
      .then(m => m.MyBookingsComponent)
}
,
{
  path: 'booking/ticket/:bookingId',
  canActivate: [AuthGuard],
  loadComponent: () =>
    import('./features/booking/ticket/ticket.component')
      .then(m => m.TicketComponent)
}
    ]
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component')
        .then(m => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component')
            .then(m => m.LoginComponent)
      },
       {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component')
            .then(m => m.RegisterComponent)
      },
       {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/auth/forgot-password/forgot-password.component')
            .then(m => m.ForgotPasswordComponent)
      }
    ]
  },{
  path: 'booking',
  canActivate: [AuthGuard],
  loadComponent: () =>
    import('./features/booking/booking-review/booking-review.component')
      .then(m => m.BookingReviewComponent)
},{
  path: 'payment',
 canActivate: [AuthGuard],
  loadComponent: () =>
    import('./features/payment/payment/payment.component')
      .then(m => m.PaymentComponent)
},
{
  path: 'payment/status',
   canActivate: [AuthGuard],
  loadComponent: () =>
    import('./features/payment/payment-status/payment-status.component')
      .then(m => m.PaymentStatusComponent)
}
,
{
  path: 'admin',
  canActivate: [AuthGuard, adminGuard],
    data: { roles: ['ADMIN'] },
  loadComponent: () =>
    import('./features/admin//admin-layout/admin-layout.component')
      .then(m => m.AdminLayoutComponent),
  children: [
    {
      path: '',
      loadComponent: () =>
        import('./features/admin//dashboard/dashboard.component')
          .then(m => m.AdminDashboardComponent)
    },
    {
      path: 'routes',
      loadComponent: () =>
        import('./features/admin/routes/routes.component')
          .then(m => m.AdminRoutesComponent)
    },
    {
      path: 'buses',
      loadComponent: () =>
        import('./features/admin//buses/buses.component')
          .then(m => m.AdminBusesComponent)
    },
    {
      path: 'trips',
      loadComponent: () =>
        import('./features/admin/trips/trips.component')
          .then(m => m.AdminTripsComponent)
    },
    {
      path: 'seat-layout',
      loadComponent: () =>
        import('./features/admin/seat-layout/seat-layout.component')
          .then(m => m.SeatLayoutComponent)
    }
  ]
}


];
