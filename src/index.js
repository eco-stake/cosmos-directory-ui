import 'core-js'
import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="*" name="Home" element={<App />} />
          <Route path="/:chain" element={<App />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>
);