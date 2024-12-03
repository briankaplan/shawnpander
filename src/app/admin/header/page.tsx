'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import type { HeaderContent } from '@/types/content'

export default function HeaderAdmin() {
  const [content, setContent] = useState<HeaderContent[]>([])
  const [editingContent, setEditingContent] = useState<HeaderContent | null>(null)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(content)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order numbers
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }))

    setContent(updatedItems)
    // Save to database
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Header Content</h1>
        <button
          onClick={() => setEditingContent(null)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add New Content
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="header-content">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {content.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 bg-neutral-800 rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-400">{item.type}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingContent(item)}
                            className="p-2 text-blue-400 hover:text-blue-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              // Delete content
                            }}
                            className="p-2 text-red-400 hover:text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {editingContent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-neutral-900 p-6 rounded-lg w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-4">
              {editingContent.id ? 'Edit' : 'New'} Content
            </h2>
            {/* Add form fields based on content type */}
          </div>
        </div>
      )}
    </div>
  )
} 