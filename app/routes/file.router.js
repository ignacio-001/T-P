var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var XLSX = require('xlsx');
var multer = require('multer');
const router = require('express').Router();

//multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });


//init app
var app = express();

//set the template engine
app.set('view engine', 'ejs');

//fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));

//static folder path
app.use(express.static(path.resolve(__dirname, 'public')));

//collection schema
var excelSchema = new mongoose.Schema({
    student_name : {
        type : String,
    },
    college_id : {
        type : String,
        unique : true
    },
    passout_batch : {
        type : String
    },
    program : {
        type : String,
    },
    gender : {
        type : String,
        default : 'M'
    },
    status : {
        type : String,
    },
    contact_no : {
        type : String,
    },
    college_email : {
        type : String,
    },
    alternate_email : {
        type : String,
    },
    degree : {
        type : String,
    },
    department : {
        type : String,
    },
    cgpa : {
        type : String,
    },
    matric_marks : {
        type : String
    },
    matric_board : {
        type : String
    },
    senior_marks : {
        type : String
    },
    senior_board : {
        type : String
    },
    alternate_contact_no : {
        type : String
    },
    address : {
        type : String
    },
    city : {
        type : String
    },
    post_code : {
        type : String
    },
    state : {
        type : String
    },
    country : {
        type : String
    },
    linkedln_link : {
        type : String
    },
    login_otp : {
        type : String
    },
    resume_url : {
        type : String
    },
    password : {
        type : String
        //select : false
    },
    active : {
        type : Boolean,
        default : true
    },
    temporarytoken : {
        type : String,
    },
    permission : {
        type : String,
        required : true,
        default: 'student'
    }
});

var excelModel = mongoose.model('excelData', excelSchema);


app.get('/', (req, res) => {
    excelModel.find((err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data != '') {
                res.render('home', { result: data });
            } else {
                res.render('home', { result: {} });
            }
        }
    });
});

app.post('/', upload.single('excel'), (req, res) => {
    var workbook = XLSX.readFile(req.file.path);
    var sheet_namelist = workbook.SheetNames;
    var x = 0;
    sheet_namelist.forEach(element => {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
        excelModel.insertMany(xlData, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
        x++;
    });
    res.redirect('/');
});


module.exports = router;