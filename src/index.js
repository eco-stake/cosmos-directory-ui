import 'core-js'
import React, { Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Provider } from 'react-redux'
import store from './store'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="*" name="Home" element={<App />} />
        </Routes>
      </Suspense>
    </HashRouter>
  </Provider>
);