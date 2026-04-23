import type { JSX } from "react";

export default function NotFound(): JSX.Element {
    return (
      <center style={{ minHeight: "80vh", fontSize: "1.5rem", paddingTop: "1.5rem" }}>
        <h1>Page not found</h1>
        <p> Requested page not found !!!</p>
      </center>
    );
  }