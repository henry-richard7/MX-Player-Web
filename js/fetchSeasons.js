const urlParams = new URLSearchParams(window.location.search);
const sID = urlParams.get('id');
var baseUrl = "https://media-content.akamaized.net/"

getSeasons(sID)

function getSeasons(id){
    let api = 'https://api.mxplay.com/v1/web/detail/collection?type=tvshow&id='+id+'&userid=HOTSTAR%20RANDOM%20ID%20:%201f151757-0147-4261-9cf7-e1abf4cc58cf&platform=com.mxplay.mobile&content-languages=en';  
      
    fetch(api)  
         .then(function(response){  
            let data = response.json();  
            return data;

        }) 
.then(function(data){  
	         var titleElement = document.getElementsByClassName("MovieTitle")[0]
             var descriptionElement = document.getElementsByClassName("MovieDescription")[0]
             var releaseDateElement = document.getElementsByClassName("MovieReleased")[0]
             var genreElement = document.getElementsByClassName("MovieGenre")[0]
             var posterElement = document.getElementsByClassName("img")[0]
             var image = document.createElement("img");
             var imageLink = baseUrl+data.imageInfo[2].url

             document.title = "Watch "+data.title +" For Free"

             image.setAttribute("src",imageLink)
             posterElement.appendChild(image)
             
             descriptionElement.innerHTML=data.description
             titleElement.innerHTML = data.title
             releaseDateElement.innerHTML = data.releaseDate
             genreElement.innerHTML = data.genres
             
            var seasonsArray = data.tabs[0].containers

            for(var i=0;i<seasonsArray.length;i++){
                var seasonCard = document.createElement("div")
                
                seasonCard.id = "--Season-Card"
                var anchor=document.createElement('a');
                var SeasonName = document.createElement("p")

                SeasonName.className="--SeasonName"
                SeasonName.innerHTML = "Watch "+seasonsArray[i]['title']

                anchor.href = "episodes.html?id="+seasonsArray[i]['id']

                seasonCard.appendChild(SeasonName)
                anchor.appendChild(seasonCard)
                document.querySelector(".row").appendChild(anchor);

            }
             
             
        })  
.then(function(){  
            
        });
}