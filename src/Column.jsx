import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

function Column({ id, color, name, children, size }) {
  return (
    <div key={id} style={{ marginRight: 10 }}>
      <div style={{ padding: '8px 0px' }}>
        <span
          style={{
            borderRadius: 4,
            padding: '2px 6px',
            backgroundColor: color,
            fontSize: '0.875rem',
          }}
        >
          {name}
        </span>
        <span style={{ marginLeft: 8, fontSize: '0.875rem', color: '#6B7280' }}>
          {size}
        </span>
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                borderRadius: 4,
                border: '2px solid #E5E7EB',
                background: snapshot.isDraggingOver && '#BFDBFE',
                padding: 4,
                width: 320,
                minHeight: 480,
              }}
            >
              {children}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

Column.propTypes = {
  id: PropTypes.number,
  name: PropTypes.name,
  color: PropTypes.string,
  children: PropTypes.array,
  size: PropTypes.number,
};

export default Column;
