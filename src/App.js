import { KanbanProvider } from "./context/kanbanContext";
import { Index } from "./pages/Index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div >
      <KanbanProvider>
      <Index/>
      </KanbanProvider>
      <ToastContainer 
        position="top-right"  
        autoClose={3000}    
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default App;
