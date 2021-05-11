const mongoose = require("mongoose")
const validator = require('validator')

// Database conection 
mongoose.connect('mongodb://127.0.0.1:27017/task-manaegr-api',{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});


// Users model 
const User  = mongoose.model('User', {
  name: {
    type: String,
    lowecase: true
  },
  email: {
    type: String, 
    required: true,
    trim: true,
    lowecase: true,
    validate(val){
      if(!validator.isEmail(val)){
        throw new Error ( "Email is not valid");
      }
    }
  },
  age: { 
    type: Number, 
    validate(val) {
      if(val < 0){ 
        throw new Error("Age must be greater than cero");
      }
    }
  },
  password: { 
    type: String,
    required: true,
    trim: true, 
    minLength: 7
  }
});

// New user instance 
const Pedro = new User({
  name: "Pedro daniel",
  email: 'PP@gmail.com',
  age: 20,
  password: "Password123"
});

Pedro.save()
.then(() => {
  console.log("User saved");
})
.catch(err => {
  console.log(err);
})


// Tasks model 
const Task = mongoose.model('Task',{
  description: {
    type: String, 
    required: true,
    trim: true
  },
  completed: {
    default: false,
    type: Boolean,
  }
});
// New task 
const task = new Task({
  description: "Learn the mongoose library 77"
});
// Save the new task 
task.save()
.then( () => {
  console.log("Task saved")
})
.catch(err => {
  console.log(err.errors);
})
