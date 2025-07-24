import '../../styles/signUp.css';
import { Link } from 'react-router-dom';
function Login() {
  return (
    <div className="box">
      <h1>Unlimited Movies & More</h1>
       <h1>Log In</h1>
        <form  className="form">
          <label className='lebel'>Enter Your Email</label>
          <textarea
            placeholder="Enter Your Email"
            className='textarea'
            //value={email}
            required
            //onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label className='lebel'>Password</label>
          <textarea
            placeholder="Enter Your Email"
            className='textarea'
            //value={password}
            required
            //onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className='buttonarea'>
            <button type="submit" className='button'>Login</button>
            <button type="button" className='button'>Cancel</button>
          </div>
          <div style={{display:"flex"}}>
            <h4>New User ?</h4>
             <h4><Link to="/signUp">SignUp</Link></h4>
          </div>
        </form>
        </div>
  );
}

export default Login;