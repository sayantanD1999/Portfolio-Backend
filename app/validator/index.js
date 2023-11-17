const { check } = require("express-validator");
const UserService = require("../models/user.model");
const DetailsService = require("../models/details.model");
const UserServiceClass = new UserService();


class UserValidator {

    signup() {
        return [
            check("email")
                .notEmpty()
                .withMessage("Email should not be empty")
                .isString()
                .withMessage("Email should be string")
                .isEmail()
                .withMessage("Please provide a valid email"),
            // .custom(async (value) => {
            //     return await super.getUser({ email: value }).then((data) => {
            //         if (data) {
            //             return Promise.reject("User already exists");
            //         }
            //     });
            // }),
            check("password")
                .notEmpty()
                .withMessage("Password should not be empty")
                .isString()
                .withMessage("Password should be string")
                .isLength({ min: 6 })
                .withMessage("Password should be a minimum of 6 characters"),
        ];
    }
    signin() {
        return [
            check("email")
                .notEmpty()
                .withMessage("Email should not be empty")
                .isString()
                .withMessage("Email should be string")
                .isEmail()
                .withMessage("Please provide a valid email"),
            // .custom(async (value) => {
            //     return await super.getUser({ email: value }).then((data) => {
            //         if (data) {
            //             return Promise.reject("User already exists");
            //         }
            //     });
            // }),
            check("password")
                .notEmpty()
                .withMessage("Password should not be empty")
                .isString()
                .withMessage("Password should be string")
                .isLength({ min: 6 })
                .withMessage("Password should be a minimum of 6 characters"),
        ];
    }
}

class DetailsValidator {

    Skill() {
        return [
            check("skills")
                .isArray({ min: 1 })
                .withMessage("Skills should not be empty")
        ];
    }

    Projects() {
        return [
            check("name")
                .notEmpty()
                .withMessage('Unique project name is required')
        ];
    }

    Profile() {
        return [
            check("details.email")
                .notEmpty()
                .withMessage("Email is mandatory")
        ];
    }
    
}

module.exports = {
    UserValidator, DetailsValidator
}