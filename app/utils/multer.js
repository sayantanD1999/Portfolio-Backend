const fs = require('fs')
var multer = require('multer')

const profile_img_loc = './public/profile_img_uploads';
const project_img_loc = './public/project_img_uploads';

var storage = multer.diskStorage({

    destination: function (req, file, cb, c) {
        if (req.route.path.includes('projects')) {
            fs.mkdirSync(`${project_img_loc}/${req.user._id}`, { recursive: true })
            cb(null, `${project_img_loc}/${req.user._id}`)
        }
        else {
            fs.mkdirSync('./public/profile_img_uploads', { recursive: true })
            cb(null, './public/profile_img_uploads')
        }

    },
    filename: function (req, file, cb, x) {

        // console.log('user', req.user, file)
        if (req.route.path.includes('projects')) {
            cb(null, req.user._id + "project_pic." + file.mimetype.split('/')[1])
        } else {
            cb(null, req.user._id + "profile_pic." + file.mimetype.split('/')[1])
        }

    }
})

exports.upload = multer({ storage: storage })


