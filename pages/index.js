import Link from "next/link";
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { AIP_URL } from "../config/index";

export default function HomePage({ events }) {
  // console.log(events);
  return (
    <Layout>
      <h1>Upcomming Events</h1>
      {events.length === 0 && <h1>No Events To Show</h1>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      {events.length > 0 && (
        <Link href={`/events`}>
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `http://localhost:1337/events?_sort=date:ASC&_limit=3`
  );
  const events = await res.json();
  return {
    props: { events },
    revalidate: 1,
  };
}
