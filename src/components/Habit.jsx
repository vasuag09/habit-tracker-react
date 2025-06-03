import {useContext, useState} from "react"
import { HabitContext } from "../store/habit-tracker-context"
export default function Habit({ habitText, props, onDelete, onEdit, indexValue }) {
    const [editValue, setEditValue] = useState("")
    function handleInputChange(event){
        setEditValue(event.target.value)
    }
    function handleSave(){
        onEdit(editValue)
        setEditValue("")
    }
    const habitCtxValue = useContext(HabitContext)
  return (
    <>
      <li className="habit-item" {...props}>
        {editValue !== "" ? <input type="text" onChange={handleInputChange} className="habit-input-inline"/> : 
        <div>
           <input
            type="checkbox"
            className="checkbox"
            checked={habitCtxValue.habitList[indexValue].completed}
            onChange={e => habitCtxValue.toggleComplete(e.target.checked, indexValue)}
          />
          <span className={habitCtxValue.habitList[indexValue].completed ? "habit-done" : ""}>{habitText}</span>
        </div>}
        <div className="habit-btn-container">
            <button className="edit-btn" onClick={()=>setEditValue(" ")}>Edit</button>
            <button className="delete-btn" onClick={onDelete}>Delete</button>
            {editValue != "" && <button className="edit-btn" onClick={handleSave}>Save</button>}
        </div>
      </li>
    </>
  );
}
