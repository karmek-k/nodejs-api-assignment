import 'reflect-metadata';
import container from './container/container';
import App from './services/App';
import { symbols } from './container/symbols';

const app = container.get<App>(symbols.App);

app.run(port => `Listening on ${port}`);
