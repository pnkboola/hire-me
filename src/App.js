import './css/form.css';
import './App.css'
import React from 'react';
import TriggerCulpritPR from './component/TriggerCulpritPR';
import CheckStatus from './component/CheckStatus';

class App extends React.Component {
  constructor(props){
    super();
    this.state = {
      checkStatus: false,
      showTriggerApiResponseTable: false,
      showStatusGetApiResponseTable: false,
      triggerApiResponseParams: {}
    };

    this.handleTriggerPrToolClick = this.handleTriggerPrToolClick.bind(this);
    this.handleCheckStatusClick = this.handleCheckStatusClick.bind(this);
    this.handleAppCallback = this.handleAppCallback.bind(this);
  };

  handleTriggerPrToolClick(event) {
    this.setState({
      checkStatus: false,
      showTriggerApiResponseTable: false,
      showStatusGetApiResponseTable: false
    });

    this.forceUpdate();
  }

  handleCheckStatusClick(event) {
    this.setState({
      checkStatus: true, 
      showTriggerApiResponseTable: false,
      showStatusGetApiResponseTable: false
    });

    this.forceUpdate();
  }

  handleAppCallback(childData) {
    if (childData.showTriggerApiResponseTable) {
      this.setState({showTriggerApiResponseTable: childData.showTriggerApiResponseTable});
    }

    if (childData.showStatusGetApiResponseTable) {
      this.setState({showStatusGetApiResponseTable: childData.showStatusGetApiResponseTable});
    }

    if (childData.checkStatus) {
      this.setState({
        checkStatus: childData.checkStatus,
        showTriggerApiResponseTable: false
      });
    }

    const triggerApiResponseParams = childData.triggerApiResponseParams;
    if (triggerApiResponseParams) {
      this.setState({triggerApiResponseParams: triggerApiResponseParams});
    }
  }

  render() {
    const checkStatus = this.state.checkStatus;
    let renderComponent;
    if (checkStatus) {
      renderComponent = <CheckStatus
                          triggerApiResponseParams={this.state.triggerApiResponseParams}
                          showStatusGetApiResponseTable={this.state.showStatusGetApiResponseTable}
                          parentCallback={this.handleAppCallback}>
                        </CheckStatus>
    } else {
      renderComponent = <TriggerCulpritPR 
                          showTriggerApiResponseTable={this.state.showTriggerApiResponseTable} 
                          parentCallback={this.handleAppCallback}>
                        </TriggerCulpritPR>
    }
    return (
      <div className="login-box">
        <h4>
          <a onClick={this.handleTriggerPrToolClick}>
            Hiring Tool
          </a>  <a onClick={this.handleCheckStatusClick}>
                    Check Status
                 </a>
        </h4>
        {renderComponent}
      </div>
    );
  }
}

export default App;
