import { postgresJsConfig, setEnvironmentVariables } from './util/config';

setEnvironmentVariables();

const options = postgresJsConfig;

export default options;
