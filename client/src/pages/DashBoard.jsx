export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-gray-700 hover:text-blue-600">Overview</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Analytics</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Settings</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            Action
          </button>
        </header>

        {/* Dashboard cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Card 1</h3>
            <p className="text-gray-600">Placeholder content</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Card 2</h3>
            <p className="text-gray-600">Placeholder content</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Card 3</h3>
            <p className="text-gray-600">Placeholder content</p>
          </div>
        </section>
      </main>
    </div>
  );
}
