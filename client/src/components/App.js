import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Article from "./Article";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		fetch("/me").then((response) => {
			if (response.ok) {
				response.json().then((user) => setUser(user));
			}
		});
	}, []);

	function handleLogin(user) {
		setUser(user);
	}

	function handleLogout() {
		setUser(null);
	}

	return (
		<div className="App">
			<Switch>
				<Route exact path="/articles/:id">
					<Header user={user} onLogout={handleLogout} />
					<Article />
				</Route>
				<Route exact path="/login">
					<Login onLogin={handleLogin} />
				</Route>
				<Route exact path="/">
					<Header user={user} onLogout={handleLogout} />
					<Home />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
