import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure() // controls connection & communication settings
    .use(reactotronRedux())
    .connect();

  console.tron = tron;

  tron.clear();
}
