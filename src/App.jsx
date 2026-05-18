import "./App.css";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import ChatBox from "./components/ChatBox";
import SidePanel from "./components/SidePanel";
import DashboardPreview from "./components/DashboardPreview";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <main className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6">
            <ProgressBar />
            <ChatBox />
          </main>

          <aside className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6">
            <SidePanel />
          </aside>
        </div>

        <DashboardPreview />
      </div>
    </div>
  );
}

export default App;