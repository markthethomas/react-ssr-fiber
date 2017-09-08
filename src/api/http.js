import fetch from 'isomorphic-fetch';
export async function getStarWarsPeople() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const res = await fetch('https://swapi.co/api/people', { headers });
    return await res.json();
}
