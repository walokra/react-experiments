import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Redirect, IndexRoute, browserHistory} from 'react-router';

import Main from './views/Main';
import NotFound from './views/NotFound';

// Handlers
class App extends React.Component {

    componentDidMount() {
    }

		getChildContext() {
        return {
            location: this.props.location,
            params: this.props.params
        };
    }

    render() {
				var page = this.props.children;

        return (
            <div>
                <div id="page-wrapper">
                    <main role="main" id="main" tabIndex="-1">
                        <div className="main">
                            {page}
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

App.childContextTypes = {
    location: React.PropTypes.object,
    params: React.PropTypes.object
};

App.propTypes = {
    children: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired
};

var routes = (
    <Route>
        <Route name='frontpage' path="/" component={App}>
						<IndexRoute component={Main}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Route>
);

render(<Router history={browserHistory} routes={routes}/>, document.getElementById('main-container'));
