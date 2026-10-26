import { User } from "../../models/UserModel.js";
import bcrypt from 'bcryptjs'
import { genToken } from "../../utils/Token.js";

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if ( !email || !password ) {
            return res.status(400).json({ message: "incomplete information" })
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exits" });
        }

        const IsMatch= bcrypt.compare(user.password,password);
        if(!IsMatch){
          return res.status(400).json({message:"invalid email or password"});
        }

        const token=await genToken(User._id);
        res.cookie("token",token,{
            secure:false,
            sameSite:'strict',
            maxAge:7*24*60*60*1000,
            httpOnly:true

        })

        return res.status(200).json({message:"Welcome back"});

    } catch (error) {
         return res.status(500).json({message:"Login error",error});

    }
}