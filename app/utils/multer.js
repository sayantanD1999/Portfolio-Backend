const fs = require('fs')
var multer = require('multer')

const profile_img_loc = './public/profile_img_uploads';
const project_img_loc = './public/project_img_uploads';

var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        // console.log(req.user)

        if (req.route.path.includes('projects')) {
            fs.mkdirSync(`${project_img_loc}/${req.user._id.toString()}`, { recursive: true })
            cb(null, `${project_img_loc}/${req.user._id.toString()}`)
        }
        else {
            fs.mkdirSync(profile_img_loc, { recursive: true })
            cb(null, profile_img_loc)
        }

    },
    filename: function (req, file, cb) {

        // console.log('user', req.user, file)
        if (req.route.path.includes('projects')) {
            cb(null, req.body.name + "project_pic." + file.mimetype.split('/')[1])
        } else {
            cb(null, req.user._id + "profile_pic." + file.mimetype.split('/')[1])
        }

    }
})

exports.upload = multer({ storage: storage })


