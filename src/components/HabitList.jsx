import Habit from "./Habit";
import { useState } from "react";
import { useContext } from "react";
import { HabitContext } from "../store/habit-tracker-context";
export default function HabitList() {
  const [state, setState] = useState({
    habitList: [],
    input: "",
  });
  function handleInputChange(event) {
    setState((prevStateValue) => {
      return {
        ...prevStateValue,
        input: event.target.value,
      };
    });
    console.log(state);
  }
  function handleAddValueInHabitList() {
    setState((prevStateValue) => {
      return {
        habitList: [...prevStateValue.habitList,{
          text: prevStateValue.input,
          completed: false
        }],
        input: "",
      };
    });
  }
  function handleButtonClick() {
    setState((prevStateValue) => {
      return { ...prevStateValue, input: " " };
    });
  }
  function handleDeleteValueFromList(index) {
    setState((prevStateValue) => {
      return {
        ...prevStateValue,
        habitList: prevStateValue.habitList.filter((habit, i) => i != index),
      };
    });
  }
  function handleEditValueFromList(value, index) {
    setState((prevStateValue) => {
      return {
        ...prevStateValue,
        habitList: prevStateValue.habitList.map((habit, i) => {
          return i === index ? {text: value, completed: habit.completed} : habit;
        }),
      };
    });
  }
  function toggleComplete(value,index){
    setState(prevStateValue=>{
      return {
        ...prevStateValue,
        habitList: prevStateValue.habitList.map((habit, i)=>{
          return i === index ? {text: habit.text, completed: value} : habit
        })
      }
    })
  }
  const habitCtxValue = {
    habitList: state.habitList,
    input: state.input,
    toggleComplete: toggleComplete
  }
  return (
    <HabitContext value={habitCtxValue}>
      <div className="habit-section">
        <h2 className="habit-heading">Your Habits</h2>

        <button className="add-habit-btn" onClick={handleButtonClick}>
          ➕ Add Habit
        </button>
        <div className="input-area">
          {state.input !== "" && (
            <>
              <input
                type=""
                value={state.input}
                onChange={handleInputChange}
                className="habit-input"
                />
              <span>
                <button
                  className="add-habit-btn"
                  onClick={handleAddValueInHabitList}
                  >
                  Add
                </button>
              </span>
            </>
          )}
        </div>
        <ul className="habit-list">
          {state.habitList.map((item, index) => (
            <Habit
            habitText={item.text}
            key={index}
            indexValue = {index}
            onDelete={() => handleDeleteValueFromList(index)}
            onEdit={(value) => handleEditValueFromList(value, index)}
            />
          ))}
        </ul>
      </div>
    </HabitContext>
  );
}
