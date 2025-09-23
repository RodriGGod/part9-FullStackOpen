type Props = { message: string | null; type?: "error" | "info" };

export default function Notification({ message, type = "info" }: Props) {
  if (!message) return null;

  const style = {
    padding: "8px 12px",
    borderRadius: 8,
    margin: "8px 0 16px",
    background: type === "error" ? "#fee2e2" : "#e0f2fe",
    border: `1px solid ${type === "error" ? "#ef4444" : "#0ea5e9"}`,
  } as const;

  return <div style={style}>{message}</div>;
}
