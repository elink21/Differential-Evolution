import './styles.css'
import MySlider from './Components/Slider'
import Inputs from './Components/Inputs'
import HistorialBox from './Components/HistorialBox'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import Differential from './Classes/differential';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[500],
    },
    secondary: {
      main: pink[400],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div id="diff">
        <Inputs />
        <HistorialBox id="minimize" title="Minimizado 📉" />
        <HistorialBox id="maximize" title="Maximizado 📈" />
      </div>
    </ThemeProvider>

  );
}

export default App;
