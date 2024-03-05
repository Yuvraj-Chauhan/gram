import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/* Register user */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* Log in */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ message: "User not found!" });

        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) return res.status(400).json({ message: "Invalid credentials!" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// /* Register user */
// export const register = async (req, res) => {
//     try {
//         const {
//             firstName,
//             lastName,
//             email,
//             password,
//             picturePath,
//             friends,
//             location,
//             occupation
//         } = req.body;

//         // Password constraints
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//         if (!password.match(passwordRegex)) {
//             return res.status(400).json({ message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character." });
//         }

//         const salt = await bcrypt.genSalt();
//         const passwordHash = await bcrypt.hash(password, salt);

//         const newUser = new User({
//             firstName,
//             lastName,
//             email,
//             password: passwordHash,
//             picturePath,
//             friends,
//             location,
//             occupation,
//             viewedProfile: Math.floor(Math.random() * 10000),
//             impressions: Math.floor(Math.random() * 10000)
//         });
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// /* Log in */
// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email: email });
//         if (!user) return res.status(400).json({ message: "User not found!" });

//         const isMatchPassword = await bcrypt.compare(password, user.password);
//         if (!isMatchPassword) return res.status(400).json({ message: "Invalid credentials!" });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//         delete user.password;
//         res.status(200).json({ token, user });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };