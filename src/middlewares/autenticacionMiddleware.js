

export const verificarAutenticador = (req, res, next)=> {
    if(req.session.usuario == null){
        res.redirect('/inicio/login')
        return 
    }
    next();
}

export const verificarAdministrador = (req, res, next)=> {
    if(req.session.usuario == null){
        res.redirect('/inicio/login')
        return 
    }
    next();
}