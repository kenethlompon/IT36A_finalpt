import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonAlert,
  IonLoading, // Import IonLoading
} from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useHistory } from "react-router-dom";
import "./login.css"; // Import the CSS file
import welcomeImage from "./images/icon.jpg"; // Import the image

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const history = useHistory();

  const handleLogin = async () => {
    setLoading(true); // Show loading indicator
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setWelcomeMessage(`Welcome ${userData.name}`);
        setShowAlert(true);
        setTimeout(() => {
          history.push("/home");
        }, 3000);
      } else {
        setWelcomeMessage("User does not exist");
        setShowAlert(true);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const handleSignup = () => {
    history.push("/signup");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="welcome-container">
          <img src={welcomeImage} alt="Welcome" className="welcome-image" />
          <h1 className="welcome-text">Welcome Back</h1>
        </div>
        <IonItem>
          <IonInput
            placeholder="Email"
            value={email}
            type="email"
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            placeholder="Password"
            value={password}
            type="password"
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div className="button-group">
          <IonButton className="login-button" onClick={handleLogin}>
            Login
          </IonButton>
        </div>
        <div className="signup-text">
          Don't have an account? <span onClick={handleSignup}>Sign Up</span>
        </div>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Alert"}
          message={welcomeMessage || "User does not exist"}
          buttons={["OK"]}
        />
        <IonLoading
          isOpen={loading} // Show loading indicator when loading is true
          message={"Logging in..."}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
