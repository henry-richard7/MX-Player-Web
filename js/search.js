const urlParams = new URLSearchParams(window.location.search)
const S_type = urlParams.get('type')
const S_query = urlParams.get('s')

var baseUrl = "https://media-content.akamaized.net/"
var drmLicenceUrl = "https://playlicense.mxplay.com/widevine/proxy?content_id="
search(S_type, S_query)
function search(S_type, S_query) {
    let api = "https://api.mxplay.com/v1/web/search/result?query=" + S_query + "&userid=HOTSTAR%20RANDOM%20ID%20:%201f151757-0147-4261-9cf7-e1abf4cc58cf&platform=com.mxplay.mobile&content-languages=en"
    fetch(api)
        .then(function (response) {
            let data = response.json()
            return data
        })
        .then(function (data) {
            var jData = data['sections']

            for (var i = 0; i < jData.length; i++) {
                if (S_type == 'movie') {


                    if (jData[i]['id'] == 'movie') {
                        for (var j = 0; j < jData[i]['items'].length; j++) {
                            console.log("Test");
                            var title = jData[i]['items'][j]['title']

                            var imageLink = baseUrl + jData[i]['items'][j]['imageInfo'][2].url
                            var channelCard = document.createElement("div")
                            channelCard.className = "col-lg-3 col-md-4 col-sm-6"
                            channelCard.id = "--Channel-Card"
                            var image = document.createElement("img");
                            var anchor = document.createElement('a');
                            var channelName = document.createElement("p")
                            channelName.className = "--ChannelName"

                            channelName.innerHTML = title
                            image.setAttribute("src", imageLink);

                            var provider = jData[i]['items'][j]['stream']['provider']
                            console.log(provider);

                            if (provider != "thirdParty") {
                                if (!jData[i]['items'][j]['stream']['drmProtect']) {
                                    if (jData[i]['items'][j]['stream'][provider]["dash"]["high"] != null) {
                                        anchor.href = "Player/player.html?videoUrl=" + baseUrl + jData[i]['items'][j]["stream"][provider]["dash"]["high"];
                                    }
                                    else {
                                        anchor.href = "Player/player.html?videoUrl=" + baseUrl + jData[i]['items'][j]["stream"][provider]["dash"]["base"];
                                    }
                                }
                                else {
                                    if (jData[i]['items'][j]['stream']["dash"]["high"] != null) {
                                        anchor.href = "Player/playerDRM.html?videoUrl=" + jData[i]['items'][j]["stream"][provider]["dash"]["high"] + "&drm=" + drmLicenceUrl + jData[i]['items'][j]["stream"]["videoHash"];
                                    }
                                    else {
                                        anchor.href = "Player/playerDRM.html?videoUrl=" + jData[i]['items'][j]["stream"][provider]["dash"]["base"] + "&drm=" + drmLicenceUrl + jData[i]['items'][j]["stream"]["videoHash"];
                                    }
                                }
                            }
                            else {
                                if (jData[i]['items'][j]['stream'][provider]["webHlsUrl"] != null) {
                                    anchor.href = "Player/player.html?videoUrl=" + baseUrl + jData[i]['items'][j]["stream"][provider]["webHlsUrl"];
                                }
                                else {
                                    anchor.href = "Player/player.html?videoUrl=" + baseUrl + jData[i]['items'][j]["stream"][provider]["hlsUrl"];
                                }
                            }
                            image.className = "TV_Channels"
                            anchor.appendChild(image)
                            channelCard.appendChild(anchor)
                            channelCard.appendChild(channelName)
                            document.querySelector(".row").appendChild(channelCard);
                        }
                    }
                } else {
                    if (jData[i]['id'] == 'shows') {
                        for (var j = 0; j < jData[i]['items'].length; j++) {
                            var title = jData[i]['items'][j]['title']

                            var imageLink = baseUrl + jData[i]['items'][j]['imageInfo'][2].url
                            var channelCard = document.createElement("div")
                            channelCard.className = "col-lg-3 col-md-4 col-sm-6"
                            channelCard.id = "--Channel-Card"
                            var image = document.createElement("img");
                            var anchor = document.createElement('a');
                            var channelName = document.createElement("p")
                            channelName.className = "--ChannelName"

                            channelName.innerHTML = title
                            image.setAttribute("src", imageLink);

                            anchor.href = "seasons.html?id=" + jData[i]['items'][j]["id"];

                            image.className = "TV_Channels"
                            anchor.appendChild(image)
                            channelCard.appendChild(anchor)
                            channelCard.appendChild(channelName)
                            document.querySelector(".row").appendChild(channelCard);
                        }
                    }
                }
            }
        })
}