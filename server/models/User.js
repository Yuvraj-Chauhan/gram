// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//     {
//         firstName: {
//             type: String,
//             required: true,
//             min: 2,
//             max: 50,
//         },
//         lastName: {
//             type: String,
//             required: true,
//             min: 2,
//             max: 50,
//         },
//         email: {
//             type: String,
//             required: true,
//             max: 50,
//             unique: true,
//         },
//         // password: {
//         //     type: String,
//         //     required: true,
//         //     min: 5,
//         // },
//         password: {
//             type: String,
//             required: true,
//             minlength: 8, // Updated minimum length to 8 characters
//             validate: {
//                 validator: (value) => {
//                     // Password should contain at least one uppercase, one lowercase, and one special character
//                     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
//                 },
//                 message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
//             },
//         },
//         picturePath: {
//             type: String,
//             default: "",
//         },
//         friends: {
//             type: Array,
//             default: [],
//         },
//         location: String,
//         occupation: String,
//         viewedProfile: Number,
//         impressions: Number,
//     },
//     { timestamps: true }
// );

// const User = mongoose.model("User", UserSchema);
// export default User;

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        // password: {
        //     type: String,
        //     required: true,
        //     minlength: 8, // Updated minimum length to 8 characters
        //     validate: {
        //         validator: async function (value) {
        //             try {
        //                 // Password should contain at least one uppercase, one lowercase, and one special character
        //                 const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        //                 if (!passwordRegex.test(value)) {
        //                     throw new Error("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
        //                 }
        //             } catch (error) {
        //                 throw error;
        //             }
        //         },
        //     },
        // },
        password: {
            type: String,
            required: true,
            minlength: 8, // Updated minimum length to 8 characters
            validate: {
                validator: (value) => {
                    // Password should contain at least one uppercase, one lowercase, and one special character
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
                },
                message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
            },
        },

        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
