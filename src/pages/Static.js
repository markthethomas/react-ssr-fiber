import React, { Component } from 'react';
export default class Static extends Component {
    render() {
        return (
            <div style={{ width: '50vw', margin: 'auto' }}>
                <h2>This is a page with no data-fetching as part of render!</h2>
            </div>
        );
    }
}
