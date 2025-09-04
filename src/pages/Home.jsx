import Navigation from "../components/Navigation";
import Home1 from "../pageComponents/Home1";
import Home2 from "../pageComponents/Home2";
import Home3 from "../pageComponents/Home3";
import Home4 from "../pageComponents/Home4";
import FloatingButtons from "../components/FloatingButtons";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navigation />
      <Home1 />
      <Home2 />
      <Home3 />
      <Home4 />
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default Home;
