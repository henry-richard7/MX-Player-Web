function toast(id){
    alert("Clicked "+id)
}

let api = 'https://api.mxplay.com/v1/web/live/channels?device-density=2&userid=de6336ad-26f3-40bf-bffe-a2d2386a02b1&platform=com.mxplay.desktop&content-languages=ta,te,ml,kn,en,mr,pa,bn,bho,gu,hi';  
      
    fetch(api)  
         .then(function(response){  
            let data = response.json();  
            return data;

        }) 
.then(function(data){  
	         var jData = data.channels
             for(var i = 0; i < jData.length; i++) {
                var obj = jData[i];
                var channelCard = document.createElement("div")
                channelCard.className="col-lg-3 col-md-4 col-sm-6"
                channelCard.id = "--Channel-Card"
                var image = document.createElement("img");
                var anchor=document.createElement('a');
                var channelName = document.createElement("p")
                channelName.className="--ChannelName"
                channelName.innerHTML = obj.title
                anchor.href="Player/player.html?videoUrl="+obj.stream.mxplay.hls.main;
                image.setAttribute("src", "https://media-content.akamaized.net/"+obj.imageInfo[0].url);
                image.className = "TV_Channels"
                anchor.appendChild(image)
                channelCard.appendChild(anchor)
                channelCard.appendChild(channelName)
                document.querySelector(".row").appendChild(channelCard);
            }
             
        })  
.then(function(){  
            
        });  
