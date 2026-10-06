function Sidebar({ title, items, activeTab, setActiveTab }) {
  return (
    <aside className="w-full md:w-56 bg-white border border-gray-200 rounded-lg p-4 shrink-0 shadow-sm h-fit">
      {title && (
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
          {title}
        </h2>
      )}
      <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto">
        {items.map((item) => {
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition text-left whitespace-nowrap w-full ${
                isSelected
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
