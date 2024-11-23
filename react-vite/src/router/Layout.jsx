import { Outlet } from "react-router-dom";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Layout() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunkAuthenticate())
  }, [dispatch])

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
