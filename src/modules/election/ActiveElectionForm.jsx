import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ElectionTimeLine from '../../components/ElectionTimeLine/ElectionTimeLine';
import ElectionPayment from '../../components/ElectionPayment/ElectionPayment';
import ElectionWeightage from '../../components/ElectionWeightage/ElectionWeightage';
import AllowNomination from './AllowNomination';
import { Redirect } from 'react-router-dom';
import NotifierRedux from '../../components/Notifier';
import { setCallElectionData, postCallElectionData,openSnackbar,getFieldOptions } from './state/ElectionAction';
import { connect } from 'react-redux';


const styles = theme => ({
  root: {
    width: '90%',
    paddingLeft: 24
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

function getSteps() {
  return ['TIMELINE', 'SELECT ELECTORATES'];
}



class VerticalLinearStepper extends React.Component {
 
  constructor(props){
    super(props);
    const {CallElectionData} = this.props;
    let newDate = new Date();
    this.state = {
      activeStep: 0,
      nominationStart: Date.parse(newDate),
      nominationEnd: Date.parse(newDate),
      objectionStart: Date.parse(newDate),
      objectionEnd: Date.parse(newDate),
      // depositAmount: 'Amount',
      // WeightagePrefarence: '%',
      // WeightageVote: '%',
      electionName:CallElectionData.electionName,
      electionModule:CallElectionData.electionModule,
      values: '',
      rowData:'',
      goToHome: false,
      columnHeaders:''
    };
    
}

componentDidMount() {
  const { CallElectionData } = this.props;
  getFieldOptions(CallElectionData.electionModule).then((data)=>{
      this.setState(data);
  })
}

  handleNext = () => {
    let activeStep;
    const { setElectionTimeLine } = this.props;


    if (activeStep === 1) {
      setElectionTimeLine(this.state);
    }
    const { setCallElectionData } = this.props;

    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));

    if (this.state.activeStep === 0) {
      setCallElectionData(this.state);
    }

  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleSubmit = () => {
    const { postCallElectionData, CallElectionData, electionData,openSnackbar } = this.props;
    
    openSnackbar({ message: CallElectionData.electionName + ' has been submitted for approval ' });
    
    postCallElectionData(CallElectionData, electionData);
    this.setState({
      goToHome: true
  });
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  }

  getStepContent(step, values) {
    switch (step) {
      case 0:
        return <ElectionTimeLine
          handleChange={this.handleChange}
          values={values}
        />;
      // case 1:
      //   return <ElectionPayment
      //     handleChange={this.handleChange}
      //     values={values}
      //   />;
      // case 2:
      //   return <ElectionWeightage
      //     handleChange={this.handleChange}
      //     values={values}
      //   />;
      case 1:
        return <AllowNomination
          handleChange={this.handleChange}
          values={values}
        />;
      default:
        return 'Unknown step';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const { nominationStart, nominationEnd, objectionStart, objectionEnd, depositAmount, WeightageVote, WeightagePrefarence,columnHeaders } = this.state;
    const values = { nominationStart, nominationEnd, objectionStart, objectionEnd, depositAmount, WeightageVote, WeightagePrefarence,columnHeaders }



    return (
      <div className={classes.root}>
        {this.state.goToHome ? (
                                <Redirect  to="/admin/call-election" />
                            ) : (
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (

              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{this.getStepContent(activeStep, values)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      // onClick={activeStep === 3 ? this.handleSubmit : this.handleNext}

                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
                )}
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps have been completed</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
            <Button color="primary" onClick={this.handleSubmit} className={classes.button}>
            Submit for approval
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = ({ Election }) => {

  const { setCallElectionData, postCallElectionData,openSnackbar } = Election;
  const CallElectionData = Election.CallElectionData;
  const electionData = Election.electionData;

  return { setCallElectionData, CallElectionData, electionData, postCallElectionData,openSnackbar }
};

const mapActionsToProps = {
  setCallElectionData,
  postCallElectionData,
  openSnackbar
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(VerticalLinearStepper));

