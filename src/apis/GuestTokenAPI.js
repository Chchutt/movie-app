import axios from 'axios';

export async function movieRatedApi() {
  const res = await fetch(
    'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=dd9a14f262f150d795284bd8afed1534'
  );
  const data = await res.json();
  const token = await data.guest_session_id;
  localStorage.setItem('session_id', token);
  return token;
}

export async function movieRate({ id, sessionId, value }) {
  await axios.post(
    `https://api.themoviedb.org/3/movie/${id}/rating?api_key=dd9a14f262f150d795284bd8afed1534&guest_session_id=${sessionId}`,
    { value }
  );
}
