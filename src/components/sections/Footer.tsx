const Footer = () => {
  return (
    <footer className="bg-gray-900 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Islam Hafez. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
