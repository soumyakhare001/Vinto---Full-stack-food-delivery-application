import { User } from "../../models/UserModel.js";
import bcrypt from 'bcryptjs'
import { genToken } from "../../utils/Token.js";

export const SignUp = async (req, res) => {
    try {
        const { fullName, email, password, mobile } = req.body;
        if (!fullName || !email || !password || !mobile) {
            return res.status(400).json({ message: "incomplete information" })
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "password atleast must be of 6 character" });
        }


        if (mobile.length < 10) {
            return res.status(400).json({ message: "mobile number must be of 10 digits" });
        }

        const hashpassword=await bcrypt.hash(password,10);

        const Newuser=await User.create({
            fullName,
            email,
            mobile,
            password:hashpassword
        })

        const token=await genToken(User._id);
        res.cookie("token",token,{
            secure:false,
            sameSite:'strict',
            maxAge:7*24*60*60*1000,
            httpOnly:true

        })

        return res.status(201).json({message:"User got Created"});

    } catch (error) {
        console.log(error.name,error.message)
        return res.status(500).json(error);
         

    }
}