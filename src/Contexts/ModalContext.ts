import { useState, createContext, ReactNode } from 'react';

export const ModalContext = createContext(null);

const defaultModal = {
  isModalVisible: false,
};

interface ModalDefaultOptionsProps {
  children: ReactNode;
}

const ModalProvider = ({ children }: ModalDefaultOptionsProps) => {
  const [currentModal, setCurrentModal] = useState(defaultModal);

  const saveModal = (values: any) => {
    setCurrentModal(values);
  };

  return ({ children });
};

export default ModalProvider;
