import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import PracticeTable from "./PracticeTable";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <TanStackLoadDataPerformance /> */}
        <PracticeTable />
      </QueryClientProvider>
    </>
  );
}

export default App;
