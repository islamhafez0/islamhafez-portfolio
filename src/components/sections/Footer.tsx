const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Islam Hafez. All rights reserved.
          </p>
          <p className="mt-2 text-gray-300">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
