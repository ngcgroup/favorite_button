/*global WASABI*/
import React from 'react';
import {appendScript} from '../utils/appendScript'
import { removeScript } from '../utils/removeScript'
import './CharityWidget.css';

const logo = 'charity-logos.png';
const logoWidth = '549px';
const logoHeight = '145px';


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
      document.getElementById("ws").addEventListener('load', () => {
        // DTM is loaded
        this.shouldDisplay();
      });
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
            
            // This object will include the assignment made and the status, which might tell you the experiment
            // has not been started, etc.
            // Note that if the experiment doesn't exist or hasn't been started, response.assignment is undefined, which is OK.
            if (response.assignment === 'control') {
              this.setState({
                ctbt_state: 'block'  
              });
                
            }
            else if (response.assignment === 'test') {
                this.setState({
                  ctbt_state: 'block'  
                });
               
                WASABI.postImpression({
                  'userID': this.state.userid
                }).then(
                    function(response) {
                        
                        if (response) {
                        
                        }
                    },
                    function(error) {
                        
                    }
                );
            } else {
              this.setState({
                ctbt_state: 'none'  
              });
             
            }
            // else the user got the Control bucket, and we don't do anything.
        },
        (error) => {
            
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
              
              if (response) {
                  
              }
          },
          function (error) {
             
          }
      );


    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }));
  };

   render() {
    const { isChecked } = this.state;
    const { label } = this.props;

     return (
      <div>
        <div id="ctbt" style={{ display: `${this.state.ctbt_state}` }}>
          <div className="rounded-box">
            <div className="icon-message-container">
              <img src="/images/Icon.png" alt="Icon" className="icon" />
              <p className="message">
              {label}
              </p>
            </div>
            <div className="charity-logos-container">
              
                <div className={`charity-logo-container charity-logo-container`}>
                  <img
                    src={`/charitylogos/charity-logos.png`}
                    alt={`Charity Logo`}
                    className="charity-logo"
                    style={{
                      width: logoWidth,
                      height: logoHeight,
                    }}
                  />
                </div>
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContributionsWidget;