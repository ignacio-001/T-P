const jwt = require('jsonwebtoken');
// let secret = process.env.SECRET;
let secret = "abcdef";

exports.encode = (data) => {
    // console.log(data);
    return jwt.sign({student_name:data.student_name,college_id:data.college_id}, secret)
};

exports.decode = (token) => {
    return decoded = jwt.verify(token, secret);
};
