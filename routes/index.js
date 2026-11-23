var express = require('express');
var router = express.Router();

/* GET home page. needs to be updated so that it is comments page*/
router.get('/', function(req, res, next){
  try {
    req.db.query('SELECT * FROM comments;', (err, results) => {
      if (err) {
        console.error('Error fetching comments:', err);
        return res.status(500).send('Error fetching comments');
      }
      res.render('index', { title: 'My Simple TODO', todos: results }); //this line definitely needs attention 
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

/* update this so it posts new comment. also needs to take title, rating, comment, name. can probably add all values at the same time but need to check syntax*/
router.post('/create', function (req, res, next) {
    const { title, rating, comment, firstName } = req.body;
    try {
      req.db.query('INSERT INTO comments VALUES (?);', [title, rating, comment, firstName], (err, results) => {
        if (err) {
          console.error('Error adding comment:', err);
          return res.status(500).send('Error adding comment');
        }
        console.log('comment added successfully:', results);
        // Redirect to the home page after adding
        res.redirect('/');
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).send('Error adding comment');
    }
});

// router.post('/delete', function (req, res, next) {
//     const { id } = req.body;
//     try {
//       req.db.query('DELETE FROM todos WHERE id = ?;', [id], (err, results) => {
//         if (err) {
//           console.error('Error deleting todo:', err);
//           return res.status(500).send('Error deleting todo');
//         }
//         console.log('Todo deleted successfully:', results);
//         // Redirect to the home page after deletion
//         res.redirect('/');
//     });
//     }catch (error) {
//         console.error('Error deleting todo:', error);
//         res.status(500).send('Error deleting todo:');
//     }
// });

module.exports = router;