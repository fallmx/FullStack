const Header = (props) => {
    return (
      <div>
        <h3>{props.course}</h3>
      </div>
    )
  }

const Part = (props) => {
return (
    <div>
    <p>
        {props.part.name} {props.part.exercises}
    </p>
    </div>
)
}

const Content = ({parts}) => {
return (
    <div>
    {parts.map(part =>
        <Part key={part.id} part={part} />
    )}
    </div>
)
}

const Total = ({parts}) => {
return (
    <div>
    <p><b>total of {parts.reduce((previousExercises, currentPart) => previousExercises + currentPart.exercises, 0)} exercises</b></p>
    </div>
)
}

const Course = ({course}) => (
<div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
</div>
)

export default Course
