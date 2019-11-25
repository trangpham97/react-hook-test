import React from 'react'
import { useState } from "react";
import Modal from './Modal';

const ItemImage = ({ src, callbackFromParent }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal)
    callbackFromParent(showModal);
  }
  return (
    <>
      <img className="carousel-item" src={src} onClick={toggleModal} />

      {showModal && (
        <Modal
          toggleModal={toggleModal}
          src={src}
        />
      )}

    </>
  )
}


export default ItemImage
