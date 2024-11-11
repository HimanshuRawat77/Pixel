import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMailBulk,
  faRightToBracket,
  faUserPlus,
  faSignOutAlt,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import coderImage from "./_cpen.png";
import {
  faGithub,
  faInstagram,
  faCodepen,
} from "@fortawesome/free-brands-svg-icons";
import "./home.css";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user);
      } else {
        setLoggedInUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Logout successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  return (
    <div>
      <div class="navbar_2" fit>
        <h2>CodePage</h2>
        <div>
          {loggedInUser ? (
            <>
              <span>
                Welcome, <FontAwesomeIcon icon={faFlagCheckered} /> User
              </span>
              <button onClick={handleLogout} className="login_logout">
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="login_logout">
                  <FontAwesomeIcon icon={faRightToBracket} /> Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="sign_up">
                  <FontAwesomeIcon icon={faUserPlus} /> Sign up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="body_home">
        <div className="codePenHed">
          <p id="blue">C</p>
          <p id="white">O</p>
          <p id="white">D</p>
          <p id="white">E</p>
          <div></div>
          <p id="blue">P</p>
          <p id="white">A</p>
          <p id="white">G</p>
          <p id="white">E</p>
        </div>
        <Link to="/code_editor">
          <div className="image_pro">
            <img src={coderImage} alt="Project" />
          </div>
        </Link>
      </div>
      <hr class="line" />
      <div className="about">
        <h1>About... </h1>
        <div>
          <p>
            Welcome to CodePage - where debugging is optional, but crying is
            inevitable! Our code editor is like a playground for web developers,
            minus the sandbox and plus lots of semicolons.
          </p>
          <ul>
            <li>
              Three Magical Boxes: HTML, CSS, and JavaScript living together in
              perfect harmony (until you forget a closing tag, then it's chaos).
            </li>
            <li>
              Mobile Responsive Design: Because sometimes you need to fix
              production bugs while pretending to text at family dinners.
            </li>
            <li>
              Real-time Preview: Watch your masterpiece come to life, or witness
              your CSS float everything to the moon - it's really up to you!
            </li>
            <li>
              Expandable Workspace: Because your code deserves more space than
              your browser's memory can handle.
            </li>
            <li>
              Reset Button: For when your code looks like it was written by a
              cat walking across the keyboard. No judgment, we've all been
              there.
            </li>
            <li>
              Code Trashing Feature: Finally, a legitimate way to throw away
              code instead of just commenting it out forever with "// TODO: Fix
              later".
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="handles">
        <a
          href="https://github.com/SahilS2004/codepen"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} className="awe" />
        </a>
        <a
          href="https://www.instagram.com/sahil_s2004/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} className="awe" />
        </a>
        <a href="mailto:himanshu.s1205@gmail.com.com">
          <FontAwesomeIcon icon={faMailBulk} className="awe" />
        </a>
      </div>
    </div>
  );
}
