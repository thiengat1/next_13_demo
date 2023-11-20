import Link from 'next/link';
import { resolve } from 'path';

interface ITickets {
  id: string;
  title: string;
  body: string;
  priority: string;
  user_email: string;
}

async function getTickets() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch('http://localhost:4000/tickets', {
    next: {
      revalidate: 60,
    },
  });

  return res.json();
}

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <div>
      {tickets.map((ticket: ITickets) => (
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
      {tickets.length === 0 && (
        <p className='text-center'>there are no open tickets, yay!</p>
      )}
    </div>
  );
}
