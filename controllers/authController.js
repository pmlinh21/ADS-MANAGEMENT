const loginSuccess = (req, res) => {
    let {email, role, id} = req.params
    console.log(req.session)

    req.session.email = email;
    req.session.role = role;
    req.session.id = id;
    
    return res.redirect("/")
}

module.exports = {loginSuccess}