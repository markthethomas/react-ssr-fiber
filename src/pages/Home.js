import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div>
                <h2>The homepage!</h2>
                <p>
                    Check out the other pages{' '}
                    <span aria-label="pointing up" role="img">
                        ☝️
                    </span>{' '}
                    in the nav
                </p>
            </div>
        );
    }
}

export default Home;
