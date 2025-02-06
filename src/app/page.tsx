import { Metadata } from "next";
import TableComponent from "./components/table";

export const metadata: Metadata = {
  title: 'Dashboard Users',
  description: 'Manuseie o dashboard de usuários da API',
}

export default function Home() {
  return (
    <div className="p-10 grid gap-4">
        <TableComponent />
    </div>
  );
}
