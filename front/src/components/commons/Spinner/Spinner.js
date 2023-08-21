import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { Component } from "react";
import './spinner.css'
class Spinner extends Component {

  render() {
    const { loading } = this.props;

    return (
      loading && (
        <Box sx={{
          position: 'fixed', // Fixed position
          top: 0, // Top position
          left: 0, // Left position
          width: '100%', // Full width
          height: '100vh', // Full height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '9999',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background with black
        }}>
          <CircularProgress size={100} />
        </Box>
      )
    )
  }

}

export default Spinner;