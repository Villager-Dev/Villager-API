# Villager-API
A useful, Minecraft-related and otherwise API, designed to be used by [Villager Bot](https://github.com/Villager-Dev/Villager-Bot)
* The api is currently running and accessible at `api.iapetus11.me`

## Routes / Endpoints
### **Minecraft Related Endpoints/Routes**
* [Ratelimit: 2 requests / 2.5 seconds] (Applies to all endpoints under /mc/)
* `GET /mc/mcstatus/:mcserver`
  * Takes one **url** parameter:
    * `mcserver` (required) which is the host/ip of the server
  * Example: `GET https://api.iapetus11.me/mc/mcstatus/hypixel.net:25565`
  * Returns a JSON response

<br>

* `GET /mc/servercard/:mcserver`
  * takes one **url** and one [optional] **query** parameter:
    * `mcserver` (required, url parameter) which is the host/ip of the server
    * `customname` (optional, query parameter) text which will be shown instead of the server ip in the generated image
  * Example: `GET https://api.iapetus11.me/mc/servercard/hypixel.net:25565?customname=BruhCraftHD`
  * Returns an image, returns JSON if an error occurs

<br>

* `GET /mc/serverfavi/:mcserver`
  * takes one **url** parameter:
    * `mcserver` (required) which is the host/ip of the server
  * Example: `GET https://api.iapetus11.me/mc/serverfavi/hypixel.net:25565`
  * Returns an image, returns JSON if an error occurs

<br>

* `GET /mc/achievement/:text`
  * takes on **url** parameter:
    * `text` (required) which is the text which goes in the generated achievement (Must not be over 30 characters)
  * Example: `GET https://api.iapetus11.me/mc/achievement/best%20api`
  * Returns an image, returns JSON if an error occurs

<br>

* `GET /mc/splashscreen/:text`
  * takes on **url** parameter:
    * `text` (required) which is the text which goes in the generated achievement (Must not be over 200 characters)
  * Example: `GET https://api.iapetus11.me/mc/splashscreen/villager%20bot%20best%20bot`
  * Returns an image, returns JSON if an error occurs

<br>

### **Reddit Related Endpoints/Routes**
* [Ratelimit: 2 requests / 2.5 seconds] (Applies to all endpoints under /reddit/)
* `GET /reddit/gimme/:subreddits`
  * takes one parameter **in the url**
    * `subreddits` (required) the subreddits to fetch images from
  * Example 1: `GET https://api.iapetus11.me/reddit/gimme/dankmemes`
  * Example 2: `GET https://api.iapetus11.me/reddit/gimme/dankmemes+memes+me_irl+meme`
  * Returns a JSON response
