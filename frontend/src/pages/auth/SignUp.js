import '../../styles/signUp.css';
function SignUp() {
  return (
    <div className="box">
       <h1>Unlimited Movies & More</h1>
       <h1>Sign Up</h1>
        <form  className="form">
          <label className='lebel'>Enter Your Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="textarea"
            //value={name}
            required
            //onChange={(e) => setName(e.target.value)}
          />

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
            <button type="submit" className='button'>SignUp</button>
            <button type="button" className='button'>Cancel</button>
          </div>
          
        </form>
        </div>
  );
}

export default SignUp;