import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Head from './head.tsx';
import Title from './title.tsx';
import Foot from './foot.tsx';
import IndexForm from './indexForm.jsx';


ReactDOM.render(<Head />, document.getElementById('head'));
ReactDOM.render(<Title />, document.getElementById('title'));
ReactDOM.render(<IndexForm />, document.getElementById('form'));
ReactDOM.render(<Foot />, document.getElementById('foot'));
