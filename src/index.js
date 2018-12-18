import ReactDOM from 'react-dom';
import Route from './router/index';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(new Route().render(), document.getElementById('root'));
require('./assets/css/common.css')
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
