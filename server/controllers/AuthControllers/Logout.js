

export const Logout=async(req,res)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({message:"User got LogOut"});
    } catch (error) {
       res.status(500).json({message:"Logout error"});  
    }
}