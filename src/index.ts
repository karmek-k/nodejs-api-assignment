import 'reflect-metadata';
import container from './container/container';
import App from './services/App';

const app = container.get<App>(App);

app.run(port => `Listening on ${port}`);
