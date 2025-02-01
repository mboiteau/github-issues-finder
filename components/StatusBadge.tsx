import { Status } from "@/constants";

interface StatusBadgeProps {
  status: string;
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${
        status === Status.OPEN ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
