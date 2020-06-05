const axios = require('axios');
const host = "https://www.instagram.com/"
const igInstance = axios.create({
    baseURL: host,
    timeout: 5000,
    headers: {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
        'Cookie': cookie,
    }
});

const getFriendShipId = async (igId) => {
    try {
        const response = await igInstance.request({
            url: igId.trim(),
            method: 'get',
            params: {
                "__a": '1'
            }
        })

        return response.data.graphql.user.id;
    } catch (err) {
        errorLogging("Error when getting friendship of " + igId, err);
        throw "Unsuccess of Getting friendship of " + igId;
    }
    
}

const followIg = async (friendshipId) => {
    try {
        const response = await igInstance.post("web/friendships/" + friendshipId.trim() + "/follow");

        if (response.result == "following" && response.status == "ok") {
            return true;
        } else {
            console.log(friendshipId + "'s follow response normal but result is not following");
            return false;
        }
    } catch (err) {
        errorLogging("Error when following friendship of " +  friendshipId, err);
        return false;
    }

}


  const errorLogging = (logLabel, error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(logLabel, error.response.data);
      console.log(logLabel, error.response.status);
      console.log(logLabel, error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(logLabel, error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(logLabel, error.message);
    }
    console.log(logLabel, error.config);
  }