import React from 'react'

const Modal = ({ toggleModal, src }) => (
	<div className="modal-background">	
		<div className="modal-box">			
				<i
					onClick={() => toggleModal()}
					className="fas fa-times close-btn">
				</i>
			<div className="content">      
        <img className="carousel-item-big" src={src} alt='item'/>
			</div>
		</div>
	</div>
)

export default Modal
