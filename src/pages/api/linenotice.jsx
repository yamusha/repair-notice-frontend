
var request = require('request');
export default async (req, res) => {
  
  var token = `VjCC1gAJfClc91mkbI15IAjtPzaot4n24L8eqgwiWAb`;
  

  // console.log(req.query);
  if(req.query !== "undefined"){
 var message = `โรงเรียน${req.query.school} แจ้งซ่อมใหม่ในระบบ`;
  request({
    method: 'POST',
    uri: 'https://notify-api.line.me/api/notify',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      'bearer': token
    },
    form: {
      message: message
    }
  }, (err, httpResponse, body) => {
    if(err){
      console.log(err);
    } else {
      res.json({
        httpResponse: httpResponse,
        body: body
      });
    }
  });}
}
