import { Metadata } from "next";
import TableComponent from "./components/table";

export default function Home() {
  return (
    <div className="p-10 grid gap-4">
        <TableComponent />
    </div>
  );
}
