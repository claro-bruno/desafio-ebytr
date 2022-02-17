import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import SHeaderContainer from './style';
import { HeaderCard } from '../../atoms';
import { useAuth } from '../../contexts/AuthContext';
import { useTasks } from '../../contexts/TasksContext';
import CreateTaskForm from '../../templates/createTask';

// eslint-disable-next-line import/prefer-default-export
export function TasksHeader() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { modalIsOpen, setModalIsOpen } = useTasks();
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  const onLogoutClicked = () => {
    logout();
  };

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };
  return (

    <SHeaderContainer>
      <>
        <HeaderCard
          styleType="secondary"
          onClick={ setModalIsOpenToTrue }
        >
          Cadastrar Tasks
        </HeaderCard>

        <Modal isOpen={ modalIsOpen }>
          <button type="button" onClick={ setModalIsOpenToFalse }>x</button>
          <CreateTaskForm />
        </Modal>
      </>
      <div>
        <HeaderCard
          onClick={ () => {
            if (currentUser.role === 'user') {
              navigate('/user/tasks');
            }
          } }
        >
          {
            (currentUser.role === 'user' && 'MINHAS TASKS')
          }
        </HeaderCard>
      </div>
      <div>
        <HeaderCard
          testid="customer_products__element-navbar-user-full-name"
          styleType="tertiary"
        >
          { currentUser.name }
        </HeaderCard>
        <HeaderCard
          testid="customer_products__element-navbar-link-logout"
          styleType="quarternary"
          onClick={ onLogoutClicked }
          isButton
        >
          Sair
        </HeaderCard>
      </div>
    </SHeaderContainer>
  );
}
