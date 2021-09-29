const express = require('express');
const News = require('../models/news')

const router = express.Router();


router.all('*', (req,res, next) => {
  if (!req.session.admin) {
    res.redirect('login');

    return;
  }

  next();
});

/* GET home page. */
router.get('/', (req, res) => {
  // const newsData = new News({
  //   title: 'Tytuł testowy',
  //   description: 'Opis'
  // });
  // newsData.save((err) => {
  //   console.log(err);
  // });

  News.find({}, (err, data) => {
    console.log(data);

    res.render('admin/index', { title: 'Admin', data });

  });
  
});


router.get('/news/add', (req, res) => {
  res.render('admin/news-form.pug', {title: 'Dodaj news', body: {}, errors: {} })
});


router.post('/news/add', (req, res) => {
  const body = req.body;

    const newsData = new News(body);
    const errors = newsData.validateSync();

    // console.log(errors);


    newsData.save((err) => {
    // console.log(err);
      if(err) {
        res.render('admin/news-form.pug', {title: 'Dodaj news', errors, body});
        return;
      }
      res.redirect('/admin')
  });

});

router.get('/news/delete/:id', (req, res) => {
  News.findByIdAndDelete(req.params.id, (err)=> {
    res.redirect('/admin')
  });


});


module.exports = router;