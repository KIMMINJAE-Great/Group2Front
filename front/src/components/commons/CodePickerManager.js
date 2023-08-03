import React from "react";
import CodePicker from "./CodePicker";
import TradeCodePicker from "./Acc1012CodePicker";
import Acc1013CodePicker from "./Acc1013CodePicker";
import Acc1012CodePicker from "./Acc1012CodePicker";
import RegCarCodePicker from "./RegCarCodPicker";


class CodePickerManager extends React.Component {
    render() {
      return (
        this.props.helpId === 'company' ? <Acc1013CodePicker></Acc1013CodePicker>
        : this.props.helpId === 'regcar' ? <RegCarCodePicker></RegCarCodePicker>
        : this.props.helpId === 'TRADE_CODE' ? <Acc1012CodePicker></Acc1012CodePicker>
        
        : null
      );
    }
  }
  
  export default CodePickerManager;