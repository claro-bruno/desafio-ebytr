import React from 'react';
import {
  STasksTable,
  STasksTableTh,
  STasksTableContainer,
  STaskTableRowTd,
} from './style';
import { Button } from '../../atoms';
import { useTasks } from '../../contexts/TasksContext';

export default function TasksTamplate() {
  const { tasks, remove, update } = useTasks();

  const removeTask = async (item) => {
    await remove(item);
  };

  const updateTask = async (item, status) => {
    await update(item, status);
  };

  return (
    <STasksTableContainer>
      <STasksTable>
        <thead>
          <tr>
            <STasksTableTh>Título</STasksTableTh>
            <STasksTableTh>Descrição</STasksTableTh>
            <STasksTableTh>Status</STasksTableTh>
            <STasksTableTh>Data</STasksTableTh>
            <STasksTableTh>Pendente</STasksTableTh>
            <STasksTableTh>Em andamento</STasksTableTh>
            <STasksTableTh>Concluído</STasksTableTh>
            <STasksTableTh>Remover</STasksTableTh>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map((task) => (
              <tr key={ task.id }>
                <STaskTableRowTd>{ task.title }</STaskTableRowTd>
                <STaskTableRowTd>{ task.description }</STaskTableRowTd>
                <STaskTableRowTd>{ task.status }</STaskTableRowTd>
                <STaskTableRowTd>
                  { new Intl.DateTimeFormat('pt-BR').format(new Date(task.published)) }
                </STaskTableRowTd>
                <STaskTableRowTd styleType="secondary" align="center">
                  <Button
                    disabled={ task.status === 'pendente' && 'true' }
                    styleType="secondary"
                    onClick={ () => updateTask(task, 'pendente') }
                  >
                    Pendente
                  </Button>
                </STaskTableRowTd>
                <STaskTableRowTd styleType="secondary" align="center">
                  <Button
                    styleType="primary"
                    disabled={ task.status === 'em andamento' && 'true' }
                    onClick={ () => updateTask(task, 'em andamento') }
                  >
                    Em andamento
                  </Button>
                </STaskTableRowTd>
                <STaskTableRowTd styleType="secondary" align="center">
                  <Button
                    styleType="terciary"
                    disabled={ task.status === 'concluido' && 'true' }
                    onClick={ () => updateTask(task, 'concluido') }
                  >
                    Concluído
                  </Button>
                </STaskTableRowTd>
                <STaskTableRowTd styleType="secondary" align="center">
                  <Button
                    styleType="secondary"
                    onClick={ () => removeTask(task) }
                  >
                    Remover
                  </Button>
                </STaskTableRowTd>
              </tr>
            ))
          }
        </tbody>
      </STasksTable>
    </STasksTableContainer>
  );
}
