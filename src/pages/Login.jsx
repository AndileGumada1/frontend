import { useState, useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner"
import {login,reset} from '../features/auth/authSlice'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
   
  })
  const { email, password} = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector( (state) => state.auth)
 
  useEffect(() =>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/')
    }
    dispatch(reset())
  },[user, isError, isSuccess,message, navigate, dispatch]) 
  
  const onSubmit = (e) =>{
    e.preventDefault()
    const userData = {
      email,
      password,
    }
     dispatch(login(userData))
  }
  const onChange = (e) => {
    setFormData((prevState)=> ({
      ...prevState,
    [e.target.name]:e.target.value,
    }))
  }
  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
    <section>
      <h1>
        <p>Please login to your account</p>
      </h1>
    </section>
    <form onSubmit={onSubmit}>
      
      <div className="form-group">
        <input type='text' className='form-control'
        id='email'
        name='email'
        value={email}
        placeholder='Please enter your email'
        onChange={onChange}>
        </input>
      </div>
      <div className="form-group">
        <input type='text' className='form-control'
        id='password'
        name='password'
        value={password}
        placeholder='Please enter your password'
        onChange={onChange}>
        </input>
      </div>
      
      <div className="form-group">
        <button type="submit" className='btn btn-block'> Submit</button>
      </div>
 
    </form>
    </>
  )
}

export default Login