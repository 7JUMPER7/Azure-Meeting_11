const axios = require('axios');

module.exports = async function (context, req) {
    await axios({
        baseURL: 'http://d288a48c-b9f3-44fd-9714-a5b91ac6ff23.northeurope.azurecontainer.io/score', 
        method: 'post',
        data: req.body
    }).then(function (response) {
        const json = JSON.parse(response.data);
        context.res.body = {
            status: 200,
            response: json.result[0]
        }
    }).catch(err => {
        context.res.body = {
            status: 404,
            message: err
        }
    })
}