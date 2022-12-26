import { useEffect, useState } from "react";
import "./form.css";
// import Regpic from "../../imgs/Regpic.jpg";
import axios from "axios";
import Map from "./Map";

function Form() {
    const [lat,Setlat]=useState(15.7642);
    const [lon,Setlon]=useState(77.4759);
  const [formValues, setFormValues] = useState({
    userid: "",
    title: "",
    body: "",
  });
  const [users, setUsers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const Submit=async(e)=>{
    e.preventDefault();
    console.log(e.target.userid.value);
    const allusers = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(allusers)
    for (let i of allusers.data) {
        // console.log(i.id.toString())
        // console.log(e.target.userid.value.toString());
      if (i.id.toString() === e.target.userid.value.toString()) {
        console.log(i); 
        localStorage.setItem("current-user", JSON.stringify(i));
        // sendEmail();
        Setlat(i.address.geo.lat);
        Setlon(i.address.geo.lng);
        console.log(lat)
        console.log(lon)
         
        break;
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    axios.post("https://jsonplaceholder.typicode.com/posts", {
      userId: formValues.userid,
      title: formValues.title,
      body: formValues.body,
    });
    alert("Successfully Posted!");
  };

  const validate = (values) => {
    const errors = {};
    if (!values.userid) {
      errors.userid = "Please select user";
    }
    if (!values.title) {
      errors.title = "This field is required!";
    }
    if (!values.body) {
      errors.body = "This field is required!";
    }
    return errors;
  };

  return (
    <div>
      <div className="content">
        
        <div className="image">
          <img className="img" src="data:image/png;base64,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" height="300px"  alt="img" />
        </div>
        <h1>Post Form</h1>
          <div className="form">
              <form className="registrationForm" onSubmit={handleSubmit}>
                <label className="label">
                  USER :&nbsp;
                  <select
                    name="userid"
                    val={formValues.userid}
                  >
                    <option val="">Select user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </label>

                <p className="error">{formErrors.userid}</p>
                <label className="label">
                  TITLE :&nbsp;
                  <input
                    className="input"
                    type="text"
                    placeholder="Title"
                    name="title"
                    val={formValues.title}
                    onChange={handleChange}
                  />
                </label>
                <p className="error">{formErrors.title}</p>
                <label className="label">
                  BODY :&nbsp;
                  <textarea
                    className="input"
                    type="text"
                    placeholder="Body"
                    name="body"
                    val={formValues.body}
                    onChange={handleChange}
                  />
                </label>
                <p className="error">{formErrors.body}</p>
                <button className="Post">POST</button>
              </form>
             
            </div>
            </div>
            <div className="map">
            <center>
            <h1>Locate User Form</h1>
            <form className="LocationForm" onSubmit={Submit}>
              <label className="label">
                  USER :&nbsp;
                  <select
                    name="userid"
                    val={formValues.userid}
                    onChange={handleChange}
                  >
                    <option val="">Select user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </label>

                <p className="error">{formErrors.userid}</p>
                <button className="Post">Location</button>
              </form>
             
              <br></br>
              <Map lt={lat} ln={lon}></Map>
              </center>
            </div>
    </div>
  );
}
export default Form;
