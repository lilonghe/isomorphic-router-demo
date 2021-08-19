import React from 'react';
import TopNav from './TopNav';
import { Helmet } from 'react-helmet';

class Home extends React.Component {
  constructor(props) {
    super(props);

    let initialState = props.staticContext || window.__SERIALIZED_STATE__;
    this.state = {
      name: undefined,
      ...initialState,
    };
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <TopNav route={this.props.route} />
        <Helmet>
          <title>Home</title>
          <meta name="description" content={name}></meta>
        </Helmet>
        <div className="container">
          <h1>Home page</h1>
          <h2>Data: {name}</h2>
        </div>
      </div>
    );
  }
}

export default Home;
