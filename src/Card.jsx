import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

function Card({ index, id, children }) {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          style={{
            background: 'white',
            margin: '0 0 8px 0',
            borderRadius: 4,
            boxShadow: `0 1px 1px rgba(0,0,0,0.12), 
                            0 2px 2px rgba(0,0,0,0.12), 
                            0 4px 4px rgba(0,0,0,0.12)`,
            border: '1px solid #E5E7EB',
            padding: 8,
            ...provided.draggableProps.style,
          }}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
}

Card.propTypes = {
  index: PropTypes.number,
  id: PropTypes.string,
  children: PropTypes.object,
};

export default Card;
