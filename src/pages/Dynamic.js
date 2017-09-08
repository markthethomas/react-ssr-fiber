import React, { Component } from 'react';
import { getStarWarsPeople } from '../api/http';
export default class Dynamic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data || null
        };
    }
    async componentDidUpdate() {
        if (!this.state.data.results) {
            const res = await getStarWarsPeople();
            this.setState({ data: res });
        }
    }
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <h2>A page with data-fetching</h2>
                <div style={{ textAlign: 'justify' }}>
                    {this.state.data.results ? (
                        this.state.data.results.map(person => (
                            <pre key={person.name}>
                                {JSON.stringify(person, null, 2)}
                            </pre>
                        ))
                    ) : (
                        <div>Loading Star Wars API...</div>
                    )}
                </div>
            </div>
        );
    }
}
