import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import {Auth, API, graphqlOperation, Hub} from "aws-amplify";
import { Authenticator, AmplifyTheme } from "aws-amplify-react";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MarketPage from "./pages/MarketPage";
import NavBar from "./components/NavBar";
import "./App.css";
import {getUser} from "./graphql/queries";
import {registerUser} from "./graphql/mutations";

export const UserContext = React.createContext();

class App extends React.Component {

  state = {
    user: null
  };

  componentDidMount() {
    this.getUserData();
    Hub.listen('auth', (data) => {
      const { payload } = data;
      this.onAuthEvent(payload);
      console.log('A new auth event has happened: ', payload.data.username + ' has ' + payload.event);
    })
  }

  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user ? this.setState({ user }) : this.setState({ user: null });
  }

  onAuthEvent(payload) {
    switch (payload.event) {
      case "signIn":
        console.log("signed in");
        this.getUserData();
        this.registerNewUser(payload.data);
        break;
      case "signUp":
        console.log("signed up");
        break;
      case "signOut":
        console.log("signed out");
        this.setState({ user: null });
        break;
      default:
        return;
    }
  }

  handleSignout = async () => {
    try {
      await Auth.signOut();
    } catch (err) {
      console.error("Error signing out user", err);
    }
  };

  registerNewUser = async signInData => {
    const getUserInput = {
      id: signInData.signInUserSession.idToken.payload.sub
    };
    const data = await API.graphql(graphqlOperation(getUser, getUserInput));
    console.log('[+] getUser REQ RESULT: ', data)
    if (!data.getUser) {
      try {
        const registerUserInput = {
          ...getUserInput,
          username: signInData.username,
          email: signInData.signInUserSession.idToken.payload.email,
          registered: true
        };
        console.log('[+] registerUserInput OBJ: ', registerUserInput)
        const newUser = await API.graphql(graphqlOperation(registerUser, { input: registerUserInput }));
        console.log({ newUser });
      } catch (err) {
        console.error('[!] Error registering new user', err);
      }
    }
  }

  render() {
    const { user } = this.state;

    return !user ? (
      <Authenticator theme={theme} />
    ) : (
      <UserContext.Provider value={{ user }}>
        <>
          <NavBar user={user} handleSignout={this.handleSignout} />
          <div className="app-container">
            <Routes>
              <Route exact path="/" element={<HomePage />}/>
              <Route path="profile" element={<ProfilePage />}/>
              <Route path="markets">
                <Route
                  path=":marketId" element={
                    <MarketPage
                      user={user}
                      // marketId={this.params.marketId}
                    />
                  }
                />
              </Route>
            </Routes>
          </div>
        </>
      </UserContext.Provider>
    );
  }
}

const theme = {
  ...AmplifyTheme, // using the spread operator (...) gives us all the default values
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: "#ffc0cb"
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "var(--amazonOrange)" // this is how we specify specific CSS variables used in the withAuthenticator() modal
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px"
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "var(--squidInk)"
  }
};

// export default withAuthenticator(App, true, [], null, theme);
export default App;