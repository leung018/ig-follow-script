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
    const response = await igInstance.request({
        url: igId.trim(),
        method: 'get',
        params: {
            "__a": '1'
        }
    })

    if (response.status != 200) {
        throw `Strange Response from ${igId}: ` + response
    }

    return response.data.graphql.user.id;
}
