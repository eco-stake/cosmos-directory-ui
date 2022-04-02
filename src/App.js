import { useEffect } from "react";

export function App() {
  useEffect(() => {
    console.log('rendered');
  });

  return <h1>Hello world!</h1>;
}
