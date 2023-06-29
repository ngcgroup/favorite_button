import React from 'react';
import {appendScript} from '../utils/appendScript'
import {removeScript} from '../utils/removeScript'

class ContributionsWidget extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isChecked: false,
      ctbt_state: 'none',
      userid: ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    };
  }
  componentDidMount () {
    appendScript("jq","https://code.jquery.com/jquery-1.12.3.min.js");
    document.getElementById("jq").addEventListener('load', () => {
      appendScript("ws", "https://experimentation.bhn.technology/scripts/wasabi.js");
    });
    document.getElementById("ws").addEventListener('load', () => {
      // DTM is loaded
      this.shouldDisplay();
    });
  }
  componentDidUnmount () {
    removeScript("https://code.jquery.com/jquery-1.12.3.min.js");
    removeScript("https://experimentation.bhn.technology/scripts/wasabi.js");
  }

  shouldDisplay = () => {
    // Set up properties that will be the same on all Wasabi calls.
    WASABI.setOptions({
      'applicationName': 'contributions',
      'experimentName': 'charity_contributions_1',
      'protocol': 'https',
      'host': 'experimentation.bhn.technology:443'
    });

    // Check Wasabi to see if this user should be in the test and which bucket.
    WASABI.getAssignment({
        'userID': this.state.userid
    }).then(
        (response) => {
            console.log('getAssignment: success');
            console.log(JSON.stringify(response));
            // This object will include the assignment made and the status, which might tell you the experiment
            // has not been started, etc.
            // Note that if the experiment doesn't exist or hasn't been started, response.assignment is undefined, which is OK.
            if (response.assignment === 'control') {
              this.setState({
                ctbt_state: 'none'  
              });
              console.log("control group");
                
            }
            else if (response.assignment === 'test') {
                this.setState({
                  ctbt_state: 'block'  
                });
                console.log("test group");
                WASABI.postImpression({
                  'userID': this.state.userid
                }).then(
                    function(response) {
                        console.log('postImpression: success');
                        if (response) {
                            console.log(JSON.stringify(response));
                        }
                    },
                    function(error) {
                        console.log('postImpression: error');
                        console.dir(error);
                    }
                );
            } else {
              this.setState({
                ctbt_state: 'none'  
              });
              console.log("no assignment");
            }
            // else the user got the Control bucket, and we don't do anything.
        },
        (error) => {
            console.log('getAssignment: error');
            console.dir(error);
            this.setState({
              ctbt_state: 'none'  
            });
        }
    );
  }
  handleCheckboxChange = () => {
      WASABI.postAction(
          'ClickedOnContribute',
          null /* No extra action info */,
          {
              'userID': this.state.userid
          }
      ).then(
          function (response) {
              console.log('postAction: success');
              if (response) {
                  console.log(JSON.stringify(response));
              }
          },
          function (error) {
              console.log('postAction: error');
              console.dir(error);
          }
      );


    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }));
  };

  render() {
    const { isChecked } = this.state;
    const { label } = this.props;
    console.log('render called ' + this.state.ctbt_state )
    return (
      <div>
        <div id="ctbt" style={{ display: `${ this.state.ctbt_state }` }}>
          Happiness doesnt result from what we get, but from what we give. BHN will give on your behalf  
          <br/>

          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={this.handleCheckboxChange}
            /> 
            {label}
          </label>
        </div>
      </div>
    );
  }
}

export default ContributionsWidget;