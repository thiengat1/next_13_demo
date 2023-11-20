import { notFound } from 'next/navigation';
import React from 'react';

interface IParams {
  params: {
    id: string;
  };
}
interface ITickets {
  id: string;
  title: string;
  body: string;
  priority: string;
  user_email: string;
}
export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/tickets');
  const tickets = await res.json();
  return tickets.map((ticket: ITickets) => ({
    id: ticket.id,
  }));
}
async function getTickets(id: string) {
  const res = await fetch('http://localhost:4000/tickets/' + id, {
    next: {
      revalidate: 30,
    },
  });
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function TicketDetails({ params }: IParams) {
  const ticket: ITickets = await getTickets(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className='card'>
        <h3>{ticket.title}</h3>
        <small>Create by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
