const urlParams = new URLSearchParams(window.location.search);
const sID = urlParams.get('id');
var baseUrl = "https://media-content.akamaized.net/"
var nextPages = ""

var baseUrl = "https://media-content.akamaized.net/"
var drmLicenceUrl = "https://playlicense.mxplay.com/widevine/proxy?content_id="

getSeasons(sID,"")

function getSeasons(id,nextPage){
    let api = 'https://api.mxplay.com/v1/web/detail/tab/tvshowepisodes?'+nextPage+'&type=season&id='+id+"&userid=3369f42b-b2ee-41a2-8cfe-84595a464920&platform=com.mxplay.desktop&content-languages=hi,en,ta,te,kn,mr,pa,ml,bn,bho,gu";  
      
    fetch(api)  
         .then(function(response){  
            let data = response.json();  
            return data;

        }) 
.then(function(data){  
        var jData = data.items
        
        nextPages = data["next"]
        console.log(nextPages);
        
        for(var i = 0; i < jData.length; i++) {
            var obj = jData[i];
            var title = obj.title;
                var imageLink = baseUrl+obj.imageInfo[1].url
                var channelCard = document.createElement("div")
                channelCard.className="col-lg-3 col-md-4 col-sm-6"
                channelCard.id = "--Channel-Card"
                var image = document.createElement("img");
                var anchor=document.createElement('a');
                var channelName = document.createElement("p")
                channelName.className="--ChannelName"

                channelName.innerHTML = title
                image.setAttribute("src", imageLink);

                var provider = obj.stream.provider
                if (provider != "thirdParty"){
                    if (! obj.stream.drmProtect){
                        if(obj["stream"][provider]["dash"]["high"] != null){
                            anchor.href="Player/player.html?videoUrl="+baseUrl+obj["stream"][provider]["dash"]["high"];
                        }
                        else{
                            anchor.href="Player/player.html?videoUrl="+baseUrl+obj["stream"][provider]["dash"]["base"];
                        }
                    }
                    else{
                        if(obj["stream"][provider]["dash"]["high"] != null){
                            anchor.href="Player/playerDRM.html?videoUrl="+obj["stream"][provider]["dash"]["high"]+"&drm="+drmLicenceUrl+obj["stream"]["videoHash"];
                        }
                        else{
                            anchor.href="Player/playerDRM.html?videoUrl="+obj["stream"][provider]["dash"]["base"]+"&drm="+drmLicenceUrl+obj["stream"]["videoHash"];
                        }
                    }
                }
                else{
                    if(obj["stream"][provider]["webHlsUrl"] != null){
                        anchor.href="Player/player.html?videoUrl="+obj["stream"][provider]["webHlsUrl"];
                    }
                    else{
                        anchor.href="Player/player.html?videoUrl="+obj["stream"][provider]["hlsUrl"];
                    }
                }
                
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
function loadMore(){
    if(nextPages !=null){
        getSeasons(sID,nextPages)
        console.log("clicked");
    }
    else{
        alert("All episodes listed!")
    }
    
}


