const Elements = () => {
  const elements = ["Buttons", "Cards", "Forms", "Tables"];

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Elements</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {elements.map((el, idx) => (
          <div key={idx} className="border p-4 rounded shadow hover:shadow-lg transition text-center">
            <span className="font-semibold">{el}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Elements;
