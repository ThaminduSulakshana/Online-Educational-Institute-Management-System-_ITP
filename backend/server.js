require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const feedbackRoutes = require('./routes/feedbacks')
const userRoutes = require('./routes/user')
const appointmentRoutes = require('./routes/appointments')
const noticeRoutes = require('./routes/notices')
const timetableRoutes = require('./routes/timetabels')
const ticketRoutes = require('./routes/tickets')
const moduleRoutes = require('./routes/module')
const quizController = require('./controllers/quiz_controller');
const questionController = require('./controllers/question_controller');
const markController = require('./controllers/mark_controller');
// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/feedbacks', feedbackRoutes)
app.use('/api/user', userRoutes)
app.use('/api/appointments',appointmentRoutes)
app.use('/api/notices',noticeRoutes)
app.use('/api/timetables',timetableRoutes)
app.use('/api/ticket', ticketRoutes)
app.use('/api/module',moduleRoutes)
app.use('/api/quizzes', quizController);
app.use('/api/questions', questionController);
app.use('/api/marks', markController);


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })




