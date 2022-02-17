import React from 'react';
import { TasksHeader } from '../../organisms/tasksHeader';
import { TasksTemplate } from '../../templates';

function Tasks() {
  return (
    <section>
      <TasksHeader />
      <TasksTemplate />
    </section>
  );
}

export default Tasks;
