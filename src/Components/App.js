import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faTrashCanArrowUp,
  faRetweet,
} from "@fortawesome/free-solid-svg-icons";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import useLocalStorage from "../hooks/useLocalStorage";
import { Link } from "react-router-dom";

// Default values for HTML, CSS, and JavaScript code with a fun twist
const text_html = `
<h1>Welcome to Himanshu's Funny Page!</h1>
<p>Get ready for some coding magic by Himanshu!</p>
<p id="js-message"></p>
`;

const text_css = `
body { 
  font-family: Comic Sans MS, sans-serif; 
  background-color: #f0f8ff;
  text-align: center;
}
h1 { 
  color: #E42541; 
  text-shadow: 2px 2px #ff0000;
}
p { 
  color: #333;
}
`;

const text_js = `
document.getElementById("js-message").innerText = "JavaScript says: Hi, Himanshu is coding here! 🎉";
console.log("Welcome to the console, Himanshu!");
`;

function App() {
  const [html, setHtml] = useLocalStorage("html", text_html);
  const [css, setCss] = useLocalStorage("css", text_css);
  const [js, setJs] = useLocalStorage("js", text_js);
  const [Doc, setDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDoc(
        `<html>
          <body> ${html} </body>
          <style> ${css} </style>
          <script> ${js} </script>
        </html>`
      );
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const [expand, setExpand] = useState(true);

  const handleReset = () => {
    localStorage.clear();
    setHtml(text_html);
    setCss(text_css);
    setJs(text_js);
  };

  const clearTrash = () => {
    localStorage.clear();
    setHtml("");
    setCss("");
    setJs("");
  };

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <h2>CodePage</h2>
        </Link>
        <div>
          <button className="reset" id="Trash" onClick={clearTrash}>
            <FontAwesomeIcon icon={faTrashCanArrowUp} /> Trash
          </button>
          <button className="reset" onClick={handleReset}>
            <FontAwesomeIcon icon={faRetweet} /> Reset
          </button>
        </div>
      </div>
      <div className="editor-space">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JavaScript"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className={`result ${expand ? "" : "fullscreen"}`}>
        <button
          className="expand"
          onClick={() => setExpand((prevExpand) => !prevExpand)}
        >
          <FontAwesomeIcon icon={expand ? faAngleUp : faAngleDown} />
        </button>
        <iframe
          srcDoc={Doc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
