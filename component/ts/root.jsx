import { h, render } from 'preact';
import Head from './head.jsx';
import Foot from './foot.jsx';
import Body from './body.jsx';
import style from '../styles/style.scss';
 
render((
    <div>
    	<Head />	
    	<Body />
    	<Foot />
    </div>
), document.body);