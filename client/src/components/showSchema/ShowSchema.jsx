import React, { useState } from 'react';

export default function ShowSchema() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = 'https://i.imgur.com/iB1WVWY.png';

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={handleOpenModal}>Show Schema</button>

      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <span style={styles.closeButton} onClick={handleCloseModal}>&times;</span>
            <img src={imageUrl} alt="Schema" style={styles.image} />
          </div>
        </div>
      )}
    </div>
  );
}

// Basic styles for modal
const styles = {
  modal: {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
    textAlign: 'center'
  },
  closeButton: {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
};