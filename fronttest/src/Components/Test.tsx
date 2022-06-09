import * as React from "react";
import "./CSS/HistoryList.css"
import "./CSS/All.css"

function loginPage() {
  const [name, setName] = React.useState('');

  return (
    <div id="main">
    <p>Welcome to cgangaro's messaging app!</p>
    <p>Please, enter your login</p>
    <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your login..."
    />
    </div>
  );
}

export default loginPage;