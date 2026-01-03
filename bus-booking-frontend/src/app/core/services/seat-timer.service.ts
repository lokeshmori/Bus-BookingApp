import { Injectable, signal } from '@angular/core';

const LOCK_DURATION_MS = 5 * 60 * 1000; // 5 minutes

@Injectable({ providedIn: 'root' })
export class SeatTimerService {

  private locks = new Map<number, number>();
  countdown = signal<number>(LOCK_DURATION_MS);

  start(seatIds: number[]) {
    const expiry = Date.now() + LOCK_DURATION_MS;

    seatIds.forEach(id => this.locks.set(id, expiry));

    this.tick();
  }

  private tick() {
    const interval = setInterval(() => {
      const now = Date.now();
      const times = Array.from(this.locks.values()).map(t => t - now);

      if (!times.length) {
        clearInterval(interval);
        return;
      }

      const minRemaining = Math.max(0, Math.min(...times));
      this.countdown.set(minRemaining);

      if (minRemaining <= 0) {
        this.locks.clear();
        clearInterval(interval);
      }
    }, 1000);
  }

  clear() {
    this.locks.clear();
  }
}
