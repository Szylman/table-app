import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/home/Home';
import NotFound from './components/pages/notFound/NotFound';
import SingleTable from "./components/pages/table/SingleTable";
import Footer from './components/views/footer/Footer';
import Header from './components/views/header/Header';
import { fetchStatus } from "./redux/statusRedux";
import { fetchData } from "./redux/tablesRedux";

function App() {

  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchData()), [dispatch] );
  useEffect(() => dispatch(fetchStatus()), [dispatch] );
  const test = useSelector(state => state.tables)

  console.log(test)
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:tableId" element={<SingleTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
