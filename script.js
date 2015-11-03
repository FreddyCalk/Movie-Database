var apiKey = '6186086d4bed15305570404c311bdc1c';
var basePath = '';
var sizeOptions = '';
var logoSizes = '';
var posterSize = '';
var profileSizes = '';
var movieArray = [];

var siteConfig = 'https://api.themoviedb.org/3/configuration?api_key='+apiKey;
var nowPlaying = 'http://api.themoviedb.org/3/movie/now_playing?api_key='+apiKey;

$(document).ready(function(){
   $.getJSON(siteConfig, function(movie){
      // Gathering the data from the database.
      basePath = movie.images.base_url;
      sizeOptions = movie.images.poster_sizes;
      posterSize = 'w300';
      logoSizes = logoSizes['original'];
      profileSizes = profileSizes['original'];

   });
   $.getJSON(nowPlaying, function(movie){
      var html = '';
      var x = 0;
      movieArray = movie.results;
      for(i=0;i<movieArray.length;i++){
         x++;
         var isAdult = movieArray[i].adult;
         var backdrop_path = movieArray[i].backdrop_path;
         var genreIds = movieArray[i].genre_ids;
         var movieId = movieArray[i].id;
         var movieTitle = movieArray[i].title;
         var overview = movieArray[i].overview;
         var popularity = movieArray[i].popularity;
         var posterPath = movieArray[i].poster_path;
         var releaseDate = movieArray[i].release_date;
         var voteAverage = movieArray[i].vote_average;
         var voteCount = movieArray[i].vote_count;         
         var html = '<div class="poster">';
                html += '<img title="'+movieTitle+': '+overview+'" alt="'+movieTitle+'" src="'+basePath+posterSize+posterPath+'">'
             html += '</div>';
         $('#poster-wrapper').append(html);
      }
   })
})