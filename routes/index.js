var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);


// Lista de todas las preguntas
router.get('/quizes', quizController.index);

/* GET page quiz pregunta seleccionada de la lista. */
/* router.get('/quizes/question', quizController.question); */
router.get('/quizes/:quizId(\\d+)', quizController.show);

/* GET page quiz respuesta a la pregunta seleccionada de la lista. */
/* router.get('/quizes/answer', quizController.answer); */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/author', quizController.autor);

module.exports = router;
