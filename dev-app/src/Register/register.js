import React, { Component } from 'react';
import './register.scss';
import { toast, Slide } from 'react-toastify';
import axios from 'axios';
import { Redirect } from 'react-router';
import logo from "../Images/klear.png";
import { Navbar } from 'react-bootstrap';
import {API_ENDPOINT} from "../config/config";
toast.configure({
    autoClose: 1500,
    draggable: false,
    transition: Slide,
    //etc you get the idea
});
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            company: "",
            role: "user",
            salary:'',
            // redirect: false,
            // hideMe: false,
            // errorCount: null,
            errors: {
                firstName: '',
                email: '',
                password: '',
            }
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'firstName':
                errors.firstName =
                    value.length < 4
                        ? 'Full Name must be 4 characters long!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }
    alrdyuser = () => {
        this.props.history.push('/');
    }
    handleRegister = (event) => {
        event.preventDefault();

        const { firstName,fullName, lastName, email, password, company,salary} = this.state;
        
        const payload = {
            fullName: fullName,
            // lastName: lastName,
            userName: email,
            password: password,
            company: company,
            role: 'user',
            salary:salary,
        }
        // console.log(payload);
        
        axios.post(`${API_ENDPOINT}api/create/user`, payload)
            .then(res => {
               if(res.status===200){
                toast.success('Successfully registred', { containerId: 'ERROR' });
                this.setState({
                    formValid: validateForm(this.state.errors),
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    company: "",
                    salary:'',
                    redirect: true,
                    
                });
               }
                
            })
      
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/' />
        }
        const { errors, formValid,fullName, email,salary, password, company } = this.state;
        const isEnabled = email.length > 0 && password.length > 0 && fullName.length > 0 && company.length > 0 && salary.length > 0;
        return (
            <React.Fragment>
                <section className="regpageAlign">
                    <div className="regheader">
                        <Navbar className="regNavbar">
                            <Navbar.Brand> <img alt="Logo" className="loginlogo" src={logo}></img></Navbar.Brand>
                            <Navbar.Toggle />
                            <Navbar.Text className="headertext">
                                <p className="timesheetText"> Klear</p> <p className="tracker">Money</p>
                            </Navbar.Text>
                            <Navbar.Text className="Regvesriontext">
                                
                            </Navbar.Text>
                        </Navbar>
                    </div>
                    <div className='Signupwrapper'>
                        <div className='form-Signupwrapper'>
                            <h2>New User</h2>
                            <form onSubmit={this.handleRegister} noValidate className="regForm">
                                <div className='RegfirstName'>
                                    <label htmlFor="firstName">Full Name</label>
                                    <input type='text' name='fullName' onChange={this.handleChange} noValidate />
                                    {errors.firstName.length > 0 &&
                                        <span className='error'>{errors.firstName}</span>}
                                </div>
                                {/* <div className='ReglastName'>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type='text' name='lastName' onChange={this.handleChange} noValidate />
                                </div> */}
                                <div className='Regemail'>
                                    <label htmlFor="email">Email</label>
                                    <input type='email' name='email' onChange={this.handleChange} noValidate />
                                    {errors.email.length > 0 &&
                                        <span className='error'>{errors.email}</span>}
                                </div>
                                <div className='Regpassword'>
                                    <label htmlFor="password">Password</label>
                                    <input type='password' name='password' onChange={this.handleChange} noValidate />

                                </div>
                                <div className='Regcompany'>
                                    <label htmlFor="company">Company</label>
                                    <input type='text' name='company' onChange={this.handleChange} noValidate />
                                </div>
                                <div className='Regcompany'>
                                    <label htmlFor="company">Salary (Per Month)</label>
                                    <input type='number' name='salary' onChange={this.handleChange} noValidate />
                                </div>
                                
                                <div className='register'>
                                    <button type='submit'>Register</button>
                                </div>

                                <div className="alrdyuser">
                                    <p onClick={this.alrdyuser}>Already user ?</p>
                                </div>
                            </form>
                        </div>

                    </div>
                </section>
            </React.Fragment>

        );
    }
}

export default Register