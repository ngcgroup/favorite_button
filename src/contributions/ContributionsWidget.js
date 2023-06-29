import React from 'react';

class ContributionsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }

  handleCheckboxChange = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked
    }));
  };

  render() {
    const { isChecked } = this.state;
    const { label } = this.props;

    return (
      <div>
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
    );
  }
}

export default ContributionsWidget;