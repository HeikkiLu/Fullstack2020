import React from 'react'

const Header = props => {
  return(
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
      <div>
          {props.parts.map(course => 
          <Part key={course.id} part={course.name} exercises={course.exercises} />)}
      </div>
  )
}

const Total = props => {
  const total = props.parts.reduce((sum, course) => sum + course.exercises, 0)
  return(
    <p>Number of exercises {total}</p>
  )
}

const Part = props => {
  return (
    <div>
      {props.part} {props.exercises}
    </div>
  )
}

const Course = ({courses}) => {
  return (
    <div>
      <Header course={courses.name}/>
      <Content parts={courses.parts} />
      <Total parts={courses.parts} />
    </div>
  )
}

export default Course