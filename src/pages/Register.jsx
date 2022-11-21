import { useState, useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner"
import {register,reset} from '../features/auth/authSlice'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const {name, email, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector( (state) => state.auth)
  
  const onChange = (e) => {
    setFormData((prevState)=> ({
      ...prevState,
    [e.target.name]:e.target.value,
    }))
  }
  const onSubmit = (e) =>{
    e.preventDefault()
    //when we submit we need to check if password are equal
    if(password !== password2){
      toast.error('password do not match')
    }else{
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
  }
  useEffect(() =>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/')
    }
    dispatch(reset())
  },[user, isError, isSuccess,message, navigate, dispatch])
  if(isLoading){
    return <Spinner/>
  }
  return (
   <>
   <section>
     <h1>
       <p>Please create a new account</p>
     </h1>
   </section>
   <form onSubmit={onSubmit}>
     <div className="form-group">
       <input type='text' className='form-control'
       id='name'
       name='name'
       value={name}
       placeholder='Please enter your name'
       onChange={onChange}>
       </input>
     </div>
     <div className="form-group">
       <input type='text' className='form-control'
       id='name'
       name='email'
       value={email}
       placeholder='Please enter your email'
       onChange={onChange}>
       </input>
     </div>
     <div className="form-group">
       <input type='text' className='form-control'
       id='name'
       name='password'
       value={password}
       placeholder='Please enter your password'
       onChange={onChange}>
       </input>
     </div>
     <div className="form-group">
       <input type='text' className='form-control'
       id='name'
       name='password2'
       value={password2}
       placeholder='Please confirm your password'
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

export default Register