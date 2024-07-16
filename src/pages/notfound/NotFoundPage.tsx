import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="h-screen w-screen bg-white flex items-center overflow-hidden justify-center">
    <div className="container flex flex-col md:flex-row items-center justify-center text-gray-700 gap-20">
      <div className="max-w-md">
        <h1 className="text-9xl font-dark font-bold">404</h1>
        <p className="text-2xl md:text-3xl font-light leading-normal">Oops! Page not found.</p>
        <p className="mb-8">{"We can't find the page you're looking for."}</p>

        <Link
          to="/"
          className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-300 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-primary active:bg-primary hover:bg-primary/70"
        >
          Go back home
        </Link>
      </div>
      <div className="max-w-lg">
        <img src="/images/404.svg" alt="404 images" className="w-[400px]" />
      </div>
    </div>
  </div>
);

export default NotFoundPage;
