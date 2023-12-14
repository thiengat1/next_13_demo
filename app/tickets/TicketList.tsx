'use client';
import Link from 'next/link';
import { resolve } from 'path';
import { useSWRWithEndpoint } from '../api/useSWR';

interface ITickets {
  id: string;
  title: string;
  body: string;
  priority: string;
  user_email: string;
}
export interface IApiResponse<T> {
  code: string;
  data: {
    data: T;
  };
}

export default function TicketList() {
  const { data, isLoading } =
    useSWRWithEndpoint<IApiResponse<ITickets[]>>('/tickets');

  console.log('isLoading', isLoading);

  return (
    <div>
      {data?.map((ticket: ITickets) => (
        <div key={ticket.id} className='card my-5'>
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {data?.length === 0 && (
        <p className='text-center'>there are no open tickets, yay!</p>
      )}
    </div>
  );
}
