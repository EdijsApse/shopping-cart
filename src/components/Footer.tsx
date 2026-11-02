const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-10">
      <div className="container">
        <p className="text-center">
          &copy; {year} TechStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
