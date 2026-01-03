import { Injectable, signal } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { SeatEvent } from '../../shared/models/seat-event.model';
import SockJS from 'sockjs-client/dist/sockjs';
@Injectable({ providedIn: 'root' })
export class SeatSocketService {
  private client!: Client;
  
  // Signal to track real-time seat updates
  seatEvents = signal<SeatEvent | null>(null);

  connect(tripId: number): void {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      // Useful for debugging in development
      debug: (str) => console.log(new Date(), str),
    });

    this.client.onConnect = () => {
      console.log('Connected to WebSocket');
      
      // Fixed subscription using the tripId parameter
     this.client.subscribe(`/topic/seats/${tripId}`, (message: IMessage) => {
    if (message.body) {
      try {
        // Now that backend sends JSON, this will work perfectly
        const event: SeatEvent = JSON.parse(message.body);
        
        // Update your signal/state
        this.seatEvents.set(event);
        
        console.log('Seat updated:', event);
      } catch (err) {
        console.error('Failed to parse seat event:', err, 'Body:', message.body);
      }
    }
  });
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.activate();
  }

  lockSeat(tripId: number, seatId: number ,userId :String): void {
    this.publishEvent('/app/seats/lock', { tripId, seatId , userId });
  }

  unlockSeat(tripId: number, seatId: number): void {
    this.publishEvent('/app/seats/unlock', { tripId, seatId });
  }

  private publishEvent(destination: string, body: any): void {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination,
        body: JSON.stringify(body)
      });
    } else {
      console.error('Cannot publish: STOMP client is not connected.');
    }
  }

  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
      console.log('Disconnected from WebSocket');
    }
  }

  
}
