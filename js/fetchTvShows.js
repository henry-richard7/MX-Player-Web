const urlParams = new URLSearchParams(window.location.search);
const language = urlParams.get('lang');
var pageInt = 0;
getMovies(pageInt,language)

var baseUrl = "https://media-content.akamaized.net/"
var drmLicenceUrl = "https://playlicense.mxplay.com/widevine/proxy?content_id="


function getMovies(pageNo,language){
    let api = 'https://api.mxplay.com/v1/web/detail/browseItem?&pageNum='+pageNo+'&pageSize=16&isCustomized=true&browseLangFilterIds='+language+'&type=2&userid=HOTSTAR%20RANDOM%20ID%20:%201f151757-0147-4261-9cf7-e1abf4cc58cf&platform=com.mxplay.mobile&content-languages=en';  
      
    fetch(api)  
         .then(function(response){  
            let data = response.json();  
            return data;

        }) 
.then(function(data){  
	         var jData = data.items
             for(var i = 0; i < jData.length; i++) {
                var obj = jData[i];
                var title = obj.title;
                var imageLink = baseUrl+obj.imageInfo[2].url
                
                

                var channelCard = document.createElement("div")
                channelCard.className="col-lg-3 col-md-4 col-sm-6"
                channelCard.id = "--Channel-Card"
                var image = document.createElement("img");
                var anchor=document.createElement('a');
                var channelName = document.createElement("p")
                channelName.className="--ChannelName"

                channelName.innerHTML = title
                image.setAttribute("src", imageLink);

                anchor.href="seasons.html?id="+obj["id"];
                
                image.className = "TV_Channels"
                anchor.appendChild(image)
                channelCard.appendChild(anchor)
                channelCard.appendChild(channelName)
                document.querySelector(".row").appendChild(channelCard);
            }
             
        })  
.then(function(){  
            
        });
}

$(window).on('scroll', function() {
    if ($(window).scrollTop() >= $(
      '.row').offset().top + $('.row').
        outerHeight() - window.innerHeight) {
        pageInt +=1
        getMovies(pageInt,language)
    }
});
  
