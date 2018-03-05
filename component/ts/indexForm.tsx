import * as React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


interface MyComponentProps { }
interface MyComponentState { states :  any}

class IndexForm extends React.Component<MyComponentProps, MyComponentState> {

  constructor(props){
    super(props);
    this.state={
      states : '',
    }
  }

   render() {
      return (
        <div>
		<div id="TrigerForm" >
        <div className="container">
        <hr />
        <div className="row">
          <p className="detail col-12"><em>Enter the project details below</em></p>
        </div>
        </div>

        <div className="container">
        <div className="row">

        <div className="form-group col-6">
        <label className="control-label">Team Name:</label>
        <select id="teamName" className="TeamSelect form-control">
        <option value="" >Select team name</option>
        </select>
        </div>

        <div className="form-group col-6">
        <label className="control-label">Release Name:</label>
        <input type="text" id="releaseName" className="form-control"   />
        </div>

        </div>
        </div>

        <div className="container">
        <div className="row">

        <div className="form-group col-6">
        <label className="control-label">DR Number:</label>
          <input type="text" id="dRNumber" className="form-control" />
        </div>

        <div className="form-group col-6">
        <label className="control-label">Manager:</label>
        <input type="text" id="manager" className="form-control"  />
        </div>

        </div>
        </div>

        <div className="container">
        <div className="row">

        <div className="form-group col-12">
        <label className="control-label">Planned EE:</label>
        <input type="text" id="plannedEE" className="form-control"  />
        </div>

        </div>
        </div>
		</div>
		
		
		
		
        <div id="select">
        <div className="container select">
        <div  className="row">
          <select id="Resources" className="col-4 selectpicker input-large">
            <option value="" >Select resouce</option>
          </select>
          <p className="col-4"></p>
          <select id="Role" className="col-4 selectpicker input-large">
            <option value="" >Select role</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
          </select>
        </div>
        </div>
        </div>

		
		
        <Router>
        <div>
        <div id="button-triger">
        <div className="container ">
        <div  className="row">
        <Link to="/trigger" id="triggerLink" className="col-12">Trigger a new project</Link>
        </div>
        </div>
        </div>

        <Route  />

        <div id="button-view">
        <div className="container">
        <div  className="row">
        <Link to="/edit" className="col-12" id="editLink">Edit/view DR plan</Link>
        </div>
        </div>
        </div>

        <Route />

        </div>
        </Router>


        </div>
      );
   }
}
export default IndexForm;
