import { useState } from "react";
import { useDispatch} from "react-redux";
import { createGoal } from "../Redux/features/goalsSlicer";

const GoalsForm = () => {

    const [title , setTitle] = useState('')
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createGoal({title}))
        setTitle("")
    }

    const onTextChange = (e) => {
        setTitle(e.target.value)
    }

  return (
    <>
        <form style={{display:"flex" , flexDirection:"column"}}>
            <label>Goals</label>
            <input onChange={onTextChange} placeholder='set you goals' type="text" name='goal' id='goal' value={title} style={{height:30 , paddingLeft:10}}/>
        </form>
        <div className='button-container'>
            <button onClick={onSubmit} className='form-button' type='submit' style={{marginTop:30 }}>Add Goal</button>
        </div>
    </>
  )
}

export default GoalsForm