const express = require('express')
const router = express.Router()
const request = require('request')
const converter = require('xml-js')
// 한국문화진흥원 API key
const serviceKey = '9Msc5rz1PAr8maDSmNT%2Bdw0pjCRJ1oMMALXDHtofFjR1OnxDgJoPil%2FECEYeY7F4NGa2JZGQbYmQmilXr46sag%3D%3D'

let url = 'http://www.culture.go.kr/openapi/rest/publicperformancedisplays/realm'
let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey;
queryParams += '&' + encodeURIComponent('sido') + '=' + encodeURIComponent(''); /**/
queryParams += '&' + encodeURIComponent('gugun') + '=' + encodeURIComponent(''); /**/
queryParams += '&' + encodeURIComponent('place') + '=' + encodeURIComponent(''); /**/
queryParams += '&' + encodeURIComponent('gpsxfrom') + '=' + encodeURIComponent('124'); /**/
queryParams += '&' + encodeURIComponent('gpsyfrom') + '=' + encodeURIComponent('33'); /**/
queryParams += '&' + encodeURIComponent('gpsxto') + '=' + encodeURIComponent('132'); /**/
queryParams += '&' + encodeURIComponent('gpsyto') + '=' + encodeURIComponent('43'); /**/
queryParams += '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent(''); /**/
queryParams += '&' + encodeURIComponent('sortStdr') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('ComMsgHeader') + '=' + encodeURIComponent(''); /**/
queryParams += '&' + encodeURIComponent('RequestTime') + '=' + encodeURIComponent('20100810:23003422'); /**/
queryParams += '&' + encodeURIComponent('CallBackURI') + '=' + encodeURIComponent(''); /**/
queryParams += '&' + encodeURIComponent('MsgBody') + '=' + encodeURIComponent(''); /**/
queryParams += '&' + encodeURIComponent('realmCode') + '=' + encodeURIComponent('D000'); /**/
queryParams += '&' + encodeURIComponent('cPage') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('rows') + '=' + encodeURIComponent('100'); /**/
queryParams += '&' + encodeURIComponent('from') + '=' + encodeURIComponent(''); /**/
queryParams += '&' + encodeURIComponent('to') + '=' + encodeURIComponent('20240101'); /**/

function doRequest() {
  return new Promise(function(resolve, reject) {
    request(
      {
        url: url + queryParams,
        method: 'GET'
      },
      function(err, response, body) {
        if(!err && response.statusCode === 200) {
          const xmlToJson = converter.xml2json(body, {compact: true, spaces: 4})
          const obj = JSON.parse(xmlToJson)
          resolve(obj.response.msgBody.perforList)
        } else {
          reject(error)
        }
      }
    )
  })
}

router.get('/', async (req, res) => {
  try {
    let response = await doRequest()
    res.send(response)
  } catch(error) {
    console.log(error)
  }
})

module.exports = router