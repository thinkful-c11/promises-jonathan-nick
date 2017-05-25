'use strict';
var getFromApi = function(endpoint, query={}) {
  const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
  Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
  return fetch(url).then(function(response) {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  });
};


var artist;
var getArtist = function(name) {
  return getFromApi('search', {
    q: name,
    limit: 1,
    type:'artist'
  }).then(item => {
    artist = item.artists.items[0];
    return getFromApi(`artists/${artist.id}/related-artists`);
  }).then(item => {
    artist.related = item.artists;
    return artist;
  }).catch(err => {
    console.log(err);
  });
};
