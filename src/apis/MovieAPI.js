export async function getMovieData(query = 'sim', sessionId) {
  if (sessionId) {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=dd9a14f262f150d795284bd8afed1534&language=en-US&sort_by=created_at.asc`
    );
    const body = await res.json();
    return body;
  }
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=dd9a14f262f150d795284bd8afed1534&anguage=en-US&query=${query}&page=1&include_adult=false`
  );
  const body = await res.json();
  return body;
}

export async function getMovieGanresData() {
  const res = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=dd9a14f262f150d795284bd8afed1534&language=en-US'
  );
  const body = await res.json();
  console.log(body);
  return body;
}
