import 'react-native-gesture-handler';
import { Provider } from "react-redux";
import Navigation from "./src/navigation/Navigate";
import { store } from "./src/state/store";

const App = () => { 
  return (
  <Provider store={store}>
    <Navigation />
  </Provider>    
  );
};


export default App;
