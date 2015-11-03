var apiKey = '6186086d4bed15305570404c311bdc1c';
var basePath = '';
var sizeOptions = '';
var logoSizes = '';
var posterSize = '';
var profileSizes = '';
var movieArray = [];
var searchArray= [];
var searchQuery = '';

$(document).ready(function(){
   $('#search-category').selectmenu();
   
   var siteConfig = 'http://api.themoviedb.org/3/configuration?api_key='+apiKey;
   var nowPlaying = 'http://api.themoviedb.org/3/movie/now_playing?api_key='+apiKey;
   
   $('#movie-search-form').submit(function(){
      event.preventDefault();
      var searchQuery = $('#search-bar').val().toLowerCase();
      var category = $('#search-category').val().toLowerCase();
      var searchURL = 'http://api.themoviedb.org/3/search/'+category+'?query='+searchQuery+'&api_key='+apiKey;
      $.getJSON(searchURL, function(search){
         $('#poster-wrapper').empty();
         searchArray = search.results;
         console.log(searchArray);
         for(i=0;i<searchArray.length;i++){
            var mediaType = searchArray[i].media_type;
            var posterPath = searchArray[i].poster_path;
            var isAdult = searchArray[i].adult;
            var backdrop_path = searchArray[i].backdrop_path;
            var genreIds = searchArray[i].genre_ids;
            var movieId = searchArray[i].id;  
            var overview = searchArray[i].overview;
            var popularity = searchArray[i].popularity;
            var releaseDate = searchArray[i].release_date;
            var voteAverage = searchArray[i].vote_average;
            var voteCount = searchArray[i].vote_count;
            if((category === 'tv')||(mediaType === 'tv')){
               var title = searchArray[i].original_name+" - ";
            }else if((category === 'movie')||(mediaType === 'movie')){
               title = searchArray[i].title+" - ";
            }else if((category === 'person')||(mediaType === 'person')){
               posterPath = searchArray[i].profile_path;
               title = searchArray[i].name;
               overview = '';
            }
            var html1 = '<div class="poster" id="'+title+'">';
                   html1 += '<img title="'+title+overview+'" alt="'+title+'" src="'+basePath+posterSize+posterPath+'">'
                html1 += '</div>';

            $('h2').text('Search Results');

               $('#poster-wrapper').append(html1);         
         };
            clickable();
      });  
   });

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
      movieArray = movie.results;
      for(i=0;i<movieArray.length;i++){
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
         var html = '<div class="poster" id="'+movieTitle+'">';
                html += '<img title="'+movieTitle+' - '+overview+'" alt="'+movieTitle+'" src="'+basePath+posterSize+posterPath+'">'
             html += '</div>';
         
            $('#poster-wrapper').append(html);
            clickable();
      }
   })
var clickable = function(){
   // $('.poster').click(function(){
   //    $('#poster-wrapper').empty();
   

   // })
}

})

