import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Particles from "react-tsparticles";
import CardList from "./components/CardList/CardList";
import QuizList from "./components/QuizList/QuizList";
import QuestionList from "./components/QuestionList/QuestionList";
import StudentList from "./components/StudentList/StudentList";
import InviteForm from "./components/InviteForm/InviteForm";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import CreateQuestions from "./components/CreateQuestions/CreateQuestions";
import QuizInfoPage from "./components/QuizInfoPage/QuizInfoPage";
import {particlesOptions} from './ParticlesProps.js'
import {courses} from './Courses'
import {quizzes} from './quizzes'
import {students} from './students'
import {questions} from './questions'

const initialState = {
  route: 'signin',
  isSignedIn: false,
  user: {
    name: '',
    email: '',
    department: '',
    role: 'Teacher'   // Add as required
  },
  course_page: {
    displayed_course: ''
  },
  quiz_page: {
    displayed_quiz: 0
  },
  invite_page: {
    input: ''
  }
}
class App extends Component{

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user:{
      name: data.name,
      email: data.email,
      department: data.department
    }})
  }

  onInputChange = (event) => {
    this.setState({
      invite_page:{
        input: event.target.value
      }
    });
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
      return
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  onCourseSelect = (course) =>{
    this.setState({
      route:'CoursePage',
      course_page:{
        displayed_course:course
      }
    })
  }
  sendInvite = () =>{
    alert(this.state.invite_page.input);
    // send to backend, and set route depending on received status
  }

  onAnswerChange = (key) => {

  }
  render(){
    return (
        <div className="App">
        <Particles className="particles"
          id="tsparticles"
          options={particlesOptions}
        />
          <Navigation name={this.state.user.name} isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
          <Logo isSignedIn={this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
          {
            this.state.route==='signin'
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : this.state.route==='home' 
            ? <CardList onCourseSelect={this.onCourseSelect} role={this.state.user.role} courses = {courses} onRouteChange={this.onRouteChange} />
            : this.state.route==='register'
            ? <Register onRouteChange={this.onRouteChange} />
            : this.state.route==='CoursePage'
            ? <QuizList onRouteChange={this.onRouteChange} course_code={this.state.course_page.displayed_course} role={this.state.user.role} quizzes = {quizzes} />
            : this.state.route==='StudentList'
            ? <StudentList course_code={this.state.course_page.displayed_course} onRouteChange={this.onRouteChange} students={students}/>
            : this.state.route==='InviteForm'
            ? <InviteForm sendInvite = {this.sendInvite} onInputChange={this.onInputChange} course_code={this.state.course_page.displayed_course} onRouteChange={this.onRouteChange} />
            : this.state.route==='CreateQuiz'
            ? <CreateQuiz onRouteChange={this.onRouteChange} />
            : this.state.route==='CreateQuestions'
            ? <CreateQuestions onRouteChange={this.onRouteChange} num={2} />
            : this.state.route==='QuizInfoPage'
            ? <QuizInfoPage quiz={quizzes[this.state.quiz_page.displayed_quiz]} onRouteChange={this.onRouteChange} />
            : this.state.route === 'QuestionList'
            ? <QuestionList quiz={quizzes[this.state.quiz_page.displayed_quiz]} questions={questions} onRouteChange={this.onRouteChange} />
            : <p> Component not yet created! </p>
          }
        </div>
      );
  }
}

export default App;
