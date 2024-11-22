import { Outlet } from "react-router-dom";
import { ModalProvider, Modal } from "../context/Modal";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  return (
    <>
      <ModalProvider>
        <Navigation />
        <Outlet />
        <Modal />
      </ModalProvider>
    </>
  );
}
