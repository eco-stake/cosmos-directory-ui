import 'react-app-polyfill/stable'
import 'core-js'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import App from "./App";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="*" name="Home" element={<App />} />
          <Route path="/:chain" element={<App />} />
          <Route path="/:chain/:section" element={<App />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>
)

if (process.env.BUGSNAG_KEY) {
  Bugsnag.start({
    apiKey: process.env.BUGSNAG_KEY,
    plugins: [new BugsnagPluginReact()],
    enabledReleaseStages: ['production', 'staging'],
    releaseStage: process.env.NODE_ENV
  })

  const ErrorBoundary = Bugsnag.getPlugin('react')
    .createErrorBoundary(React)

  ReactDOM.render(
    <ErrorBoundary>
      {app}
    </ErrorBoundary>,
    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    app,
    document.getElementById('root')
  );
}