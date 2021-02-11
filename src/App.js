import React from 'react';
import { Container, Box, Typography, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import RouterSetup from './RouterSetup';
import logo from './logo.png';

const useStyles = makeStyles(theme => ({
  logo: {
    marginBottom: theme.spacing(3),
    width: '300px'
  },
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

function Copyright() {
  return <Typography variant="body2" color="textSecondary" align="center">
    CloudRun {new Date().getFullYear()}
  </Typography>
}

const theme = createMuiTheme({
});

function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Container component="div" maxWidth="xl">
        <CssBaseline />
        <div className={classes.paper}>
          <img src={logo} className={classes.logo} alt="CloudRun Logo"></img>
          <RouterSetup />
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </MuiThemeProvider>
  );
}

export default App;