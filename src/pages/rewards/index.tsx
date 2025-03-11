const Rewards = () => {
  return (
      <>
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br moving-gradient text-white">

          <div
              className="text-center px-6 py-10 border border-white rounded-lg shadow-lg"
              data-aos="zoom-in"
              data-aos-duration="1000"
          >
            <img src="/logo.png" alt="vProtocol Logo" className="w-40 mx-auto mb-4"/>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Coming Soon</h1>
            <p className="text-lg md:text-xl mb-6">
              We're working hard on this feature. Stay tuned!
            </p>
            <div>
              <a href="/">
                <button
                    className="bg-white text-[#01D396]  px-6 py-2 rounded-lg font-medium hover:bg-[#000000] hover:text-white transition duration-300"
                >
                  Home
                </button>
              </a>
            </div>
          </div>
          <footer className="mt-8 text-sm opacity-80">
            © {new Date().getFullYear()} vProtocol. All rights reserved.
          </footer>
        </div>
      </>
  )
}

export default Rewards