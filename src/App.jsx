import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import update from 'immutability-helper';
import Column from './Column';
import Card from './Card';
import { makeData } from './makeData';
import { nanoid } from 'nanoid';

const columnsFromBackend = [
  {
    id: nanoid(),
    name: 'Todo',
    items: makeData(5),
    color: 'hsl(0, 85%, 85%)',
  },
  {
    id: nanoid(),
    name: 'In Progress',
    items: makeData(2),
    color: 'hsl(60, 85%, 85%)',
  },
  {
    id: nanoid(),
    name: 'Done',
    items: makeData(3),
    color: 'hsl(120, 85%, 85%)',
  },
];

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);

  function onDragEnd(result) {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      setColumns(old => {
        const sourceColumnIndex = old.findIndex(
          column => column.id === source.droppableId
        );
        const destinationColumnIndex = old.findIndex(
          column => column.id === destination.droppableId
        );
        const dragCard = old[sourceColumnIndex].items[source.index];
        return update(old, {
          [sourceColumnIndex]: {
            items: { $splice: [[source.index, 1]] },
          },
          [destinationColumnIndex]: {
            items: { $splice: [[destination.index, 0, dragCard]] },
          },
        });
      });
    } else {
      setColumns(old => {
        const columnIndex = old.findIndex(
          column => column.id === source.droppableId
        );
        const dragCard = old[columnIndex].items[source.index];
        return update(old, {
          [columnIndex]: {
            items: {
              $splice: [
                [source.index, 1],
                [destination.index, 0, dragCard],
              ],
            },
          },
        });
      });
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map(column => (
          <Column
            id={column.id}
            name={column.name}
            key={column.id}
            color={column.color}
            size={column.items.length}
          >
            {column.items.map((item, index) => (
              <Card
                id={item.id}
                index={index}
                content={item.content}
                key={item.id}
              >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      border: '2px solid #E5E7EB',
                      borderRadius: 1000,
                      overflow: 'hidden',
                    }}
                  >
                    <img src={item.avatar} width="100%" height="100%" />
                  </div>
                  <div style={{ marginLeft: 8, fontWeight: 600 }}>
                    <div>{item.name}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                      {item.company}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </Column>
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
