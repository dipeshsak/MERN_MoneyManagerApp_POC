import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signin = async (req, res) => {
    const { username, email, password, dateOfBirth } = req.body;
    if (!username || !email || !password || !dateOfBirth) return res.status(400).json({ status: false,message: 'All fields are required.' });

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({status: false, message: 'Username or email already exists.' });

console.log("IN signin",req.body)

    try{
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, dateOfBirth });
    console.log("HAshed",hashedPassword,"New user",newUser)
    await newUser.save();

    res.status(201).json({status: true, message: 'User created successfully!',username:username });
    }
    catch(error){
        res.status(500).json({ status: false,message: 'Something went wrong' });
    }
}

// Login API
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ status: false,message: 'Email and password are required.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ status: false,message: 'Invalid email or password.' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({status: false, message: 'Invalid email or password.' });

    try{
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
        status: true,
        token,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        }
    });
    }catch(error){
        res.status(500).json({status: false, message:'Something went wrong' });
    }
};