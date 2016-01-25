var apiKey = '6186086d4bed15305570404c311bdc1c';
var basePath = '';
var sizeOptions = '';
var logoSizes = '';
var posterSize = '';
var profileSizes = '';
var movieArray = [];
var searchArray= [];
var searchQuery = '';
var currData = [];

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
         var html1 = '';
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
            
            currData[movieId] = searchArray[i]
            
            if((category === 'tv')||(mediaType === 'tv')){
               var title = searchArray[i].original_name+" - ";
            }else if((category === 'movie')||(mediaType === 'movie')){
               title = searchArray[i].title+" - ";
            }else if((category === 'person')||(mediaType === 'person')){
               posterPath = searchArray[i].profile_path;
               title = searchArray[i].name;
               overview = '';
            }
            var imageSource = basePath+posterSize+posterPath
            if(posterPath == null){
               imageSource = 'http://cdn8.staztic.com/app/a/1221/1221023/im-not-available-right-now-1-1-s-307x512.jpg';
            }
            if(i%4 == 0){
               html1 += '<div class="row">';
            }

               html1 += '<div class="poster" id="'+movieId+'">';
                  html1 += '<img title="'+title+overview+'" alt="'+title+'" src='+imageSource+'>'
               html1 += '</div>';

            if(i%4 == 3){
               html1 += '</div>';
            }

            $('h2').text('Search Results');

                        
         };
            $('#poster-wrapper').append(html1);
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
         var backdropPath = movieArray[i].backdrop_path;
         var genreIds = movieArray[i].genre_ids;
         var movieId = movieArray[i].id;
         var movieTitle = movieArray[i].title;
         var overview = movieArray[i].overview;
         var popularity = movieArray[i].popularity;
         var posterPath = movieArray[i].poster_path;
         var releaseDate = movieArray[i].release_date;
         var voteAverage = movieArray[i].vote_average;
         var voteCount = movieArray[i].vote_count;

         currData[movieId] = movieArray[i];

         var imageSource = basePath+posterSize+posterPath;
         if(posterPath == null){
            imageSource = 'http://cdn8.staztic.com/app/a/1221/1221023/im-not-available-right-now-1-1-s-307x512.jpg';
         }
         var backdropSource = basePath+posterSize+backdropPath;
         if(backdropPath == null){
            backdropSource = 'http://www.allmystery.de/dateien/60808,1298758641,NotAvailable.jpg';
         }
         
         if(i%4 == 0){
            html += '<div class="row">';

         }


            html += '<div class="poster" id="'+movieId+'">';
                html += '<img title="'+movieTitle+' - '+overview+'" image="'+basePath+posterSize+backdropPath
                html += '" alt="'+movieTitle+'" src="'+imageSource+'">'
             html += '</div>';
         if(i%4 == 3){
            html += '</div>';
            console.log(i);
         }
         
            
            
      }
      $('#poster-wrapper').append(html);
      clickable();

   })
var clickable = function(){
   $('.poster').click(function(){
      $('#poster-wrapper').empty();
      console.log($(this));
      var isPerson = false;
      var identifier = $(this).attr('id');
      var data = currData[identifier];
      var title = data.title;
      var overview = data.overview;
      var backdrop = data.backdrop_path;
      if((backdrop == null)&&(data.known_for)){
         isPerson = true;
         backdrop = data.profile_path;
         title = data.name;
         var movie1 = data.known_for[0];
         var movie2 = data.known_for[1];
         var movie3 = data.known_for[2];
      }
         var imagePath = basePath+posterSize+backdrop;
      if(backdrop == null){
         var imagePath = 'http://www.allmystery.de/dateien/60808,1298758641,NotAvailable.jpg';
      }
      
      $('h2').text(title);
      var html3 = '<div id="backdrop">';
            html3 += '<img src="'+imagePath+'"></div>';
            html3 += '<div id ="overview"><p></p></div>';
      if(isPerson){
         var movie1url = basePath+posterSize+movie1.poster_path;
         var movie2url = basePath+posterSize+movie2.poster_path;
         var movie3url = basePath+posterSize+movie3.poster_path;
            html3 += '<h3>Known For</h3>';
            html3 += '<div id = "known-for"><div><img class="actorPageVideoPic" src="'+movie1url+'">';
            html3 += '<img class="actorPageVideoPic" src="'+movie2url+'">';
            html3 += '<img class="actorPageVideoPic" src="'+movie3url+'"></div>';
            html3 += '<p class="actorPageVideoPic">'+movie1.original_title+' ('+movie1.release_date.slice(0,4)+')</p>';
            html3 += '<p class="actorPageVideoPic">'+movie2.original_title+' ('+movie2.release_date.slice(0,4)+')</p>'
            html3 += '<p class="actorPageVideoPic">'+movie3.original_title+' ('+movie3.release_date.slice(0,4)+')</p>';

      }


      $('#poster-wrapper').append(html3);
      $('p').text(overview);

   })
}
   $('#home-button').click(function(){
      var html = '';
      $('#search-wrapper').empty();
      for(i=0;i<movieArray.length;i++){
         
         backdropPath = movieArray[i].backdrop_path;
         genreIds = movieArray[i].genre_ids;
         movieId = movieArray[i].id;
         movieTitle = movieArray[i].title;
         overview = movieArray[i].overview;
         popularity = movieArray[i].popularity;
         posterPath = movieArray[i].poster_path;
         releaseDate = movieArray[i].release_date;
         voteAverage = movieArray[i].vote_average;
         voteCount = movieArray[i].vote_count;

         currData[movieId] = movieArray[i];
         
         var html = '<div class="poster" id="'+movieId+'">';
                html += '<img title="'+movieTitle+' - '+overview+'" image="'+basePath+posterSize+backdropPath
                html += '" alt="'+movieTitle+'" src="'+basePath+posterSize+posterPath+'">'
             html += '</div>';

         
            $('#poster-wrapper').append(html);
            
      }
      clickable();
   })

})

