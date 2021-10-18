'use strict';

const e = React.createElement;

class leftGridContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}


const domContainer = document.querySelector('#menu_container');
ReactDOM.render(e(leftGridContainer), domContainer);