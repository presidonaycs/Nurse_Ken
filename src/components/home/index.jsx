import React, { useState } from 'react';
import { post } from '../../utility/fetch';
import greenz from '../../assets/images/Greenzone.png';
import icon from '../../assets/images/Group-2.png';
import Footer from '../layouts/Footer';
import notification from '../../utility/notification';
import { useNavigate } from 'react-router-dom';
import InputField from '../UI/InputField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

const Home = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const makePostRequest = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    setLoading(true);

    const payload = {
      email: email,
      password: password,
    };

    try {
      const data = await post(`/Auth/login/`, payload);
      if (data) {
        sessionStorage.setItem('token', data?.jwt?.token);
        sessionStorage.setItem('clinicId', data?.clinicId);
        sessionStorage.setItem('userId', data?.employeeId);
        localStorage.setItem('nurseRole', data?.role);
        localStorage.setItem('USER_INFO', JSON.stringify(data));
        sessionStorage.setItem('isAdmin', data?.isAdmin);
        Cookies.set("homeLink", data?.homeLink);
        

        const loginTime = new Date().getTime();
        localStorage.setItem('LOGIN_TIME', loginTime);

        navigate('/dashboard');
      }
    } catch (error) {
      localStorage.removeItem('USER_INFO');
      notification({
        title: 'ACCESS DENIED',
        message: 'Sorry, This user does not have access to this application. Please Contact Admin Or Check your internet connection',
        type: 'error',
      });
    }
    setLoading(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-100">
      <div className="banner">
        <div className="log flex-h-center w-100">
          <div className="flex flex-col">
            <div className="">
              <div className="m-l-20">
                <img src={icon} alt="" width={26} height={26} />
              </div>
              <div>
                <img src={greenz} alt="" width={100} height={26} />
              </div>
            </div>

            {/* Wrap in a form and call makePostRequest on submit */}
            <form onSubmit={makePostRequest}>
              <div className="m-t-40">
                <label>Username or Email</label>
                <InputField
                  type="text"
                  name="email"
                  value={email}
                  placeholder="username or email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="m-t-40 flex flex-direction-v">
                <label>Password</label>
                <div className="password-input-container">
                  <InputField
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="password-toggle-btn pointer"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </button>
                </div>
              </div>

              <div className="m-t-40">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-100 submit-btn"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
