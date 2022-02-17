import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  // useCallback,
} from 'react';
import PropTypes from 'prop-types';
import TasksService from '../services/TasksService';
import { RequestError } from '../helpers';
import { useAuth } from './AuthContext';

const TasksContext = createContext();
export const useTasks = () => useContext(TasksContext);

const tasksService = new TasksService();

export default function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const getAllTasks = async () => {
      const response = await tasksService.getAll(currentUser.id, currentUser.token);
      if (response instanceof RequestError) return setError(response.message);
      const tasksFetched = response;
      setTasks(tasksFetched.map((taskFetched) => ({
        ...taskFetched,
      })));
    };

    if (currentUser) {
      getAllTasks();
    }
  }, [currentUser]);

  const register = async ({ title, description, status = 'pendente' }) => {
    const response = await tasksService.register(
      { title, description, status },
      currentUser.token,
    );
    if (response instanceof RequestError) return setError(response.message);
    const { task } = response;
    setTasks([
      ...tasks,
      task,
    ]);
  };

  const remove = async (task) => {
    const response = await tasksService.remove(
      task,
      currentUser.token,
    );
    const { _id: idTask } = task;
    if (response instanceof RequestError) return setError(response.message);
    const index = tasks.findIndex(({ _id: id }) => id === idTask);
    tasks.splice(index, 1);
    setTasks([
      ...tasks,
    ]);
  };

  const update = async (task, status) => {
    const response = await tasksService.update(
      task,
      status,
      currentUser.token,
    );
    if (response instanceof RequestError) return setError(response.message);

    const result = await tasksService.getAll(currentUser.id, currentUser.token);
    if (result instanceof RequestError) return setError(result.message);
    const tasksFetched = result;
    setTasks(tasksFetched.map((taskFetched) => ({
      ...taskFetched,
    })));
  };
  // const updateCartItemQuantity = (quantity, id) => {
  //   setProducts((prevProducts) => prevProducts.map((prevProduct) => {
  //     if (quantity >= 0 && prevProduct.id === id) {
  //       return { ...prevProduct, quantity };
  //     }
  //     return prevProduct;
  //   }));
  // };

  // const updateCartTotalPrice = useCallback(() => {
  //   const prices = products.map((cartItem) => cartItem.price * cartItem.quantity);
  //   const finalPrice = prices.reduce((prev, curr) => prev + curr, 0);
  //   setTotalPrice(finalPrice);
  // }, [products]);

  // useEffect(() => {
  //   updateCartTotalPrice();
  // }, [updateCartTotalPrice]);

  // const clearCart = () => {
  //   setProducts((prevProducts) => prevProducts.map((prevProduct) => ({
  //     ...prevProduct,
  //     quantity: 0,
  //   })));
  //   setTotalPrice(0);
  // };

  const contextValue = {
    tasks,
    error,
    register,
    remove,
    modalIsOpen,
    setModalIsOpen,
    update,
    // totalPrice,
    // clearCart,
    // removeItem,
    // addItemToCart,
    // removeItemFromCart,
    // updateCartTotalPrice,
    // updateCartItemQuantity,
  };

  return (
    <TasksContext.Provider value={ contextValue }>
      { children }
    </TasksContext.Provider>
  );
}

TasksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
