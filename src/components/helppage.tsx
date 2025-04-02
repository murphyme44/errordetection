//imports
import { useState } from "react";
import { sha256 } from 'js-sha256';
import noteKey from "../assets/note-color-key.png"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./database"

//function for creating the help page, for authorized users
export function HelpPage({
    authorized,
    setAuthorized
}: {
    authorized: boolean;
    setAuthorized: ((authorized: boolean) => void);
}) {
    //setting state
    const [error, setError] = useState<boolean>(false);

    //checking user with login functionality

    const login = async (email: string, password: string) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log("Logged in as:", userCredential.user.email);
          // Set admin privileges based on login
          setAuthorized(true);
          setError(false);
        } catch (error) {
          console.error("Login failed");
          setError(true);
        }
    };
    
    const checkAuth = function() {
        var box1 = document.getElementById("mng-email");
        var box2 = document.getElementById("mng-pwd");
        if(box2 !== null && "value" in box2 && box1 !== null && "value" in box1) {
            var email = box1.value as string;
            var password = box2.value as string;
            login(email,password);
        }
    }

    //rendering page with help information
    return (
        <div>
            <h2 style={{ marginLeft: '3mm' }}>Welcome to the Help Page!</h2>
            <div style={{textAlign: "left", margin: "10px", padding: "10px", backgroundColor: "#fcfcd2", borderRadius: "10px"}}>
            This site is meant to help you practice your error detection skills.<br/>
            On the Exercises page, you’ll find a list of the exercises currently uploaded to the site. <br/><br />
            You can use the different filters to sort and find appropriately challenging exercises for you (e.g. if you are new to this, consider starting with: intonation + 1 voice + level 1 + drone). <br/>
            Clicking on the “drone” checkbox will find exercises that have a drone on tonic. <br/> <br />
            Clicking on the “ensemble parts” checkbox will have multiple voices/instruments performing the same part (e.g., 3 different clarinets playing the top line, one of which will perform the error(s)). <br/>
            After finding some exercises, simply click the exercise to open it! <br/> <br />
            A short excerpt of a score and an audio player will show up. Assume that the score will always be correct. <br/> <br />
            The Audio file will play a short intro (2 bars long) to let you entrain to the key, tempo, and meter (you can move the cursor to skip past this if you don’t need it). <br/>
            Your job is to click on the notes where you hear something different from what is in the score. <br/><br />
            Click a note multiple times to change which type of error you hear. <br/><br />
            A key will be present on each exercise to remind you which color corresponds to which kind of error.<br/>
            This key is also included here: <br/>
                <div>
                    <img
                    alt="note-color-key"
                    src={noteKey}
                    width="250"
                    height="125"
                    />
                </div>
            After selecting all errors, click "Check Answers" to receive feedback on how you did.<br/>
            </div>
            <div style={{margin: "6px"}}>
                <input id="mng-email" placeholder="Enter admin email..."></input>
                <span style={{padding: "10px"}}></span>
                <input id="mng-pwd" placeholder="Enter admin password..."></input>
                <span style={{padding: "10px"}}></span>
                <button onClick={checkAuth}>Submit</button>
            </div>
            {error ? <div style={{color: "red"}}>Incorrect password.</div> : <></>}
            {authorized ? <div style={{margin: "10px", padding: "10px", backgroundColor: "#fcfcd2", borderRadius: "10px"}}>
                <h5>Additional admin info: </h5>
                On the Exercise Management page, you can add new exercises, view, edit (under construction currently, do not attempt to edit), and delete previous exercises. <br/>
                To add an exercise, click the "New Exercise" button at the top of the page. <br/>
                This will open a new exercise, with fields to input tags, difficulty, and places to upload a .musicxml and a .mp3 file. <br/>
                The title of the exercise will automatically update as you select tags and difficulty. <br/>
                After uploading a .musicxml file (make sure it's specifically .musicxml!), the score will be loaded in. <br/>
                The .mp3 file will also allow you to preview the sound when you upload it. <br/>
                On the score, select a note to toggle its color, corresponding to the errors as illustrated in the key above. <br/>
                This key will also be included on every exercise for your ease of use. <br/>
                After you select a note, you can add specific feedback pertaining to the note in the feedback box. <br/>
                Once you have selected all the desired answers and entered relevant feedback (if any), click the Update Answers button. <br/>
                This will prepare the exercise for saving and uploading to the database. You can also click Reset Answers to clear the exercise and start from a fresh score. <br/>
                After clicking Update Answers, click Save once you're ready to upload the exercise to the database. <br/>
                If you want to delete an exercise instead, just click the Delete button. <br/>
                Once you've saved an exercise, it will appear on the Exercise page, able to be practiced! <br/>
                <br></br>
                If you come across any bugs, be sure to report them to Dr. Duker or the Outclassed Dev Team. <br/>
            </div> : <></>}
        </div>
    );
}
