const setRequest = (req, res, next) =>{
    req.body = JSON.parse(JSON.stringify(req.body));
    next();    
}

module.exports = {setRequest};