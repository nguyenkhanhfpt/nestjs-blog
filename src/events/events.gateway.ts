import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { from, map, Observable } from 'rxjs';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @SubscribeMessage('identity')
  handleEvent(@MessageBody() data: string): Observable<WsResponse<number>> {
    const event = 'events';
    const response = [1, 2, 3, 4, 5];

    return from(response).pipe(map((data) => ({ event, data })));
  }

  @SubscribeMessage('events')
  handleEvent2(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ): string {
    setTimeout(() => {
      client.emit('events', { data: 'emit events from server!' }, (data) =>
        console.log(data),
      );
    }, 1000);
    return data;
  }
}
