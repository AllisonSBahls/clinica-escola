class IndexController {

    index(req, res) {
         res.render("index/login")
    }

    dashboard(req, res){
        res.render('index/dashboard')
    }
}


module.exports = IndexController;