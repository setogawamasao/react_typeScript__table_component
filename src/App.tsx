import React from "react";
import logo from "./logo.svg";
import "./App.css";

type Row = {
  id: number;
  name: string;
  age: number;
};

type UserProps = {
  row: Row;
};

type UsersState = {
  rows: Row[];
};

class User extends React.Component<UserProps, {}> {
  render() {
    return (
      <tr>
        <td>{this.props.row.id}</td>
        <td>{this.props.row.name}</td>
        <td>{this.props.row.age}</td>
      </tr>
    );
  }
}

class Users extends React.Component<{}, UsersState> {
  constructor(props: {}) {
    super(props);
    this.state = { rows: [] };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:8080/dummy.json");
    const json = await response.json();
    let rows: Row[] = [];

    for await (let row of json.user_list) {
      rows.push(row);
    }

    this.setState({ rows: rows });
  }

  render() {
    const users = this.state.rows.map((row, idx) => {
      return <User key={idx.toString()} row={row} />;
    });

    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>AGE</th>
          </tr>
          {users}
        </tbody>
      </table>
    );
  }
}

function App() {
  return <Users />;
}

export default App;
