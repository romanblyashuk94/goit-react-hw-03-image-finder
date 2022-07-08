import React from 'react';
import s from './Modal.module.css';

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onModalClosed);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onModalClosed);
  }

  onModalClosed = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
    if (e.key === `Escape`) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={s.overlay} onClick={this.onModalClosed}>
        <div className={s.modal}>
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
