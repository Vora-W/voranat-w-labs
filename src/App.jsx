import './App.css'

function App() {
  return (
    <main className="min-h-screen bg-brown-100 font-sans">
      <div className="max-w-5xl mx-auto p-12 text-left">
        {/* Typography Section */}
        <section className="mb-10">
          <h1 className="text-headline-1 text-brown-600 mb-3">Headline 1</h1>
          <h2 className="text-headline-2 text-brown-600 mb-3">Headline 2</h2>
          <h3 className="text-headline-3 text-brown-600 mb-2">Headline 3</h3>
          <h4 className="text-headline-4 text-brown-600 mb-3">Headline 4</h4>
          <p className="text-body-1 text-brown-500 mb-2">
            Body 1 - This is body text with medium weight (500). Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className="text-body-2 text-brown-500 mb-2">
            Body 2 - This is also body text with the same size and weight. Sed do eiusmod tempor incididunt ut labore.
          </p>
          <p className="text-body-3 text-brown-500">
            Body 3 - This is the smallest body text. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </section>

        {/* Divider */}
        <hr className="border-brown-300 mb-8" />

        {/* Color Palette Section */}
        <section>
          <h3 className="text-headline-4 text-brown-600 mb-6">Color Palette</h3>
          
          {/* Base Colors */}
          <p className="text-body-2 text-brown-400 mb-3">Base / Neutral</p>
          {/* Row 1 */}
          <div className="grid grid-cols-4 gap-3 mb-3">
            <div className="h-14 rounded-lg bg-brown-600 flex items-center px-4">
              <span className="text-body-3 text-white">Brown 600</span>
            </div>
            <div className="h-14 rounded-lg bg-brown-500 flex items-center px-4">
              <span className="text-body-3 text-white">Brown 500</span>
            </div>
            <div className="h-14 rounded-lg bg-brown-400 flex items-center px-4">
              <span className="text-body-3 text-white">Brown 400</span>
            </div>
            <div className="h-14 rounded-lg bg-brown-300 flex items-center px-4">
              <span className="text-body-3 text-brown-600">Brown 300</span>
            </div>
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="h-14 rounded-lg bg-brown-200 flex items-center px-4">
              <span className="text-body-3 text-brown-600">Brown 200</span>
            </div>
            <div className="h-14 rounded-lg bg-brown-100 flex items-center px-4 border border-brown-300">
              <span className="text-body-3 text-brown-600">Brown 100</span>
            </div>
            <div className="h-14 rounded-lg bg-white flex items-center px-4 border border-brown-300">
              <span className="text-body-3 text-brown-600">White</span>
            </div>
          </div>

          {/* Brand Colors */}
          <p className="text-body-2 text-brown-400 mb-3">Brand</p>
          <div className="grid grid-cols-4 gap-3">
            <div className="h-14 rounded-lg bg-brand-orange flex items-center px-4">
              <span className="text-body-3 text-white">Orange</span>
            </div>
            <div className="h-14 rounded-lg bg-brand-green flex items-center px-4">
              <span className="text-body-3 text-white">Green</span>
            </div>
            <div className="h-14 rounded-lg bg-brand-green-soft flex items-center px-4">
              <span className="text-body-3 text-brown-600">Green Soft</span>
            </div>
            <div className="h-14 rounded-lg bg-brand-red flex items-center px-4">
              <span className="text-body-3 text-white">Red</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App
