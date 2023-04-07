import { useState } from "react";
import "./App.css";
import Graph from "./components/Graph";
import Form from "./components/Form";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
          <h1 className="text-4xl py-8 mb-10 mt-4 bg-primary text-white rounded">
            Expense Tracker
          </h1>

          {/* grid columns*/}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Chart */}
            <Graph></Graph>
            {/* Form */}
            <Form></Form>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
