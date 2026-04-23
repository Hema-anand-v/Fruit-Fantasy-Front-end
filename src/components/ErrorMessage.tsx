import type { JSX } from "react";

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps): JSX.Element {
  const errorMesageStyle: React.CSSProperties = { color: "red", padding: "1rem", textAlign: "center" };
  return (
    <div style={errorMesageStyle}>
      <p>{message}</p>
    </div>
  );
}
