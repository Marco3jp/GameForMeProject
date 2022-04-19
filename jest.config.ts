import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  transform: {
    "^.+\\.ts$": "ts-jest",
    '^.+\\.js$': 'babel-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/service/**/*.ts',
  ]
};
export default config;
