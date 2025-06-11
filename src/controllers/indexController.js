export const getIndex = async (req,res)=>{
    try {
        res.render('index',{usuario: req.session.usuario});
    } catch (error) {
        console.error("Error getIndex", error);
    }
    
}