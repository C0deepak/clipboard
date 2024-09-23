'use client'

import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { format } from 'date-fns';
import { AlarmClock, Circle, CircleCheck } from 'lucide-react';

export const StrictModeDroppable = ({ children, ...props }) => {
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));
        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);
    if (!enabled) {
        return null;
    }
    return <Droppable {...props}>{children}</Droppable>;
};

const TaskDnD = ({ tasks, updateTaskStatus }) => {
    const [newTasks, setNewTasks] = useState()

    useEffect(() => {
        setNewTasks(tasks)
    }, [tasks])

    const handleOnDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (!destination || destination.droppableId === source.droppableId) return;

        const updatedTask = newTasks.find((task) => task.id === draggableId);

        if (updatedTask) {
            const updatedTaskWithNewStatus = { ...updatedTask, status: destination.droppableId };

            updateTaskStatus(updatedTaskWithNewStatus);

            // Optionally, update the task in the UI
            const updatedTasks = newTasks.map((task) =>
                task.id === draggableId ? updatedTaskWithNewStatus : task
            );
            setNewTasks(updatedTasks);
        };
    }

    const getBadgeStyles = (type, value) => {
        const styles = {
            priority: {
                LOW: 'border border-yellow-400 text-yellow-400',
                MEDIUM: 'border border-orange-400 text-orange-400',
                HIGH: 'border border-red-400 text-red-400',
            },
            status: {
                TODO: 'text-blue-400',
                PROGRESS: 'text-amber-400',
                COMPLETED: 'text-green-400',
            },
        };
        return styles[type][value] || '';
    };

    const getDisplayText = (type, value) => {
        const displayTexts = {
            priority: {
                LOW: 'Low',
                MEDIUM: 'Medium',
                HIGH: 'High',
            },
            status: {
                TODO: (
                    <>
                        <Circle className='w-3 h-3 mr-2' />
                        To Do
                    </>
                ),
                PROGRESS: (
                    <>
                        <AlarmClock className='w-3 h-3 mr-2' />
                        In Progress
                    </>
                ),
                COMPLETED: (
                    <>
                        <CircleCheck className='w-3 h-3 mr-2' />
                        Completed
                    </>
                ),
            },
        };
        return displayTexts[type][value] || value;
    };

    return (
        <Card className='w-full md:w-1/2'>
            <CardHeader className='flex flex-col space-y-4'>
                <CardTitle>Streamline Your Workflow with Ease</CardTitle>
                <CardDescription>
                    Effortlessly manage and update your task status with our intuitive drag-and-drop feature —
                    empowering you to maintain productivity and focus.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div className="grid grid-cols-3 gap-4">
                        {['TODO', 'PROGRESS', 'COMPLETED'].map((status) => (
                            <StrictModeDroppable droppableId={status} key={status} type='group'>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="kanban-column flex flex-col gap-2"
                                    >
                                        <h3 className='text-sm text-muted-foreground font-medium flex items-center'>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full capitalize ${getBadgeStyles('status', status)}`}>
                                                {getDisplayText('status', status)}
                                            </span>
                                        </h3>
                                        {newTasks
                                            .filter((task) => task.status === status)
                                            .map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="kanban-task flex flex-col gap-1 p-2 border text-sm rounded-md cursor-grabbing"
                                                        >
                                                            <span>{task.title}</span>
                                                            <span className='text-xs text-muted-foreground'>{task.due ? format(task.due, 'PPP') : 'NA'}</span>
                                                            <div className='flex justify-end pt-2'>
                                                                <span className={`inline-flex items-center text-xs px-2 py-.5 rounded-full w-fit ${getBadgeStyles('priority', task.priority)}`}>
                                                                    Priority : {getDisplayText('priority', task.priority)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </StrictModeDroppable >
                        ))}
                    </div>
                </DragDropContext>

            </CardContent>
        </Card>
    )
}

export default TaskDnD