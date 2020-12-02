//upload file from excel
const mongoose = require('mongoose');
const Lecture=mongoose.model('Lecture');
const fs = require('fs');
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');


global.__basedir = __dirname;

// -> Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});
const upload = multer({storage: storage,
               fileFilter : function(req, file, callback) { //file filter
                    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                        return callback(new Error('Wrong extension type'));
                    }
                    callback(null, true);
                }}).single("uploadfile");
 
// -> Express Upload RestAPIs
module.exports.uploadFileAndRegisterUniversityStaff= async (req, res) =>{
    await upload(req, res, function (err) {
       console.log(req.file);
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        } else {
        const csvFilePath = __basedir + '/uploads/' + req.file.filename
        importExcelData2MongoDB(csvFilePath);
          return  res.json({
             'msg': 'File uploaded/import successfully!', 'file': req.file
            });
            
        }
      });
}
    
 
// -> Import Excel File to MongoDB database
const importExcelData2MongoDB= (filePath)=>{
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets:[{
            name: 'UniversityStaff',
            header:{
               rows: 1
            },
            columnToKey: {
                A:'firstName',
                B:'middleName',
                C:'lastName',
                D:'email',
                E:'mobile',
                F:'university',
                G:'educationStatus',
                H:'role',
                I:'study',
                J:'educationField',
                K:'department'
               
            }
        }]
    });
    console.log(excelData);
 
    Lecture.insertMany(excelData.UniversityStaff, (err, res) => {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
    });

    
 
			
    fs.unlinkSync(filePath);
   
} 