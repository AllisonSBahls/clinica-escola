class IndexController {

    index(req, res) {
         res.render("index/login")
    }

    dashboard(req, res){
        res.render('index/dashboard')
    }

    notfound(req, res){
        res.render('partials/404')
    }
}


module.exports = IndexController;