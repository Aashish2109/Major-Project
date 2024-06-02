import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateLibrary from "./components/owner/createlibrary";
import DeleteLibrary from "./components/owner/deletelibrary";
import AdminFunctions from "./components/admin/adminfunctions";
import AddBook from "./components/admin/addbook";
import UpdateBook from "./components/admin/updatebook";
import RemoveBook from "./components/admin/removebook";
import Index from "./components";
import "./App.css";
import ReaderFunctions from "./components/reader/readerfunctions";
import SearchBook from "./components/reader/searchbook";
import ErrorPage from "./components/error/errorpage";
import Login from "./components/login/login";
import Availablelibraries from "./components/owner/availablelibraries";
import RaiseBookRequest from "./components/reader/raisebookrequest";
import AvailableBooks from "./components/reader/availablebooks";
import ListRequest from "./components/admin/listrequest";
import CreateAccount from "./components/signup/signup";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} />
          <Route path="/owner/createlibrary" element={<CreateLibrary />} />
          <Route path="/owner/deletelibrary" element={<DeleteLibrary />} />
          <Route
            path="/owner/availablelibraries"
            element={<Availablelibraries />}
          />
          <Route path="/signup/signup" element={<CreateAccount/>} />
          <Route path="/login/login" element={<Login />} />
          <Route path="/admin/addbook" element={<AddBook />} />
          <Route path="/admin/adminfunctions" element={<AdminFunctions />} />
          <Route path="/admin/removebook" element={<RemoveBook />} />
          <Route path="/admin/updatebook" element={<UpdateBook />} />
          <Route path="/admin/listissuerequest" element={<ListRequest/>}/>
          <Route path="/reader/availablebooks" element={<AvailableBooks />} />
          <Route path="/reader/readerfunctions" element={<ReaderFunctions />} />
          <Route path="/reader/searchbook" element={<SearchBook />} />
          {
            <Route
              path="/reader/raisebookrequest"
              element={<RaiseBookRequest />}
            />
          }
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;