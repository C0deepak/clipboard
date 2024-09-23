'use client'

import { addOrUpdateTask, deleteTask, getTask } from '@/actions/task'
import Navbar from '@/components/layout/Navbar'
import AddTask from '@/components/tasks/AddTask'
import TaskDnD from '@/components/tasks/TaskDnD'
import TaskListing from '@/components/tasks/TaskListing'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useToast } from '@/hooks/use-toast'
import React, { useEffect, useState } from 'react'

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast()
    const user = useCurrentUser()

    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const fetchTasks = async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            const data = await getTask(user.id);
            setAllTasks(data || []);
            setTasks(data || []);
        } catch (err) {
            toast({
                title: "Error",
                variant: "error",
                description: err,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [user?.id]);

    useEffect(() => {
        let filteredTasks = [...allTasks];

        if (statusFilter) {
            filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
        }

        if (priorityFilter) {
            filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
        }

        filteredTasks.sort((a, b) => {
            if (sortOrder === 'asc') {
                return new Date(a.due) - new Date(b.due);
            } else {
                return new Date(b.due) - new Date(a.due);
            }
        });

        setTasks(filteredTasks);
    }, [statusFilter, priorityFilter, sortOrder, allTasks]);

    const handleAddTask = async (newTask) => {
        const result = await addOrUpdateTask({ userId: user.id, values: newTask });
        if (result && result.success) {
            await fetchTasks();
            return { success: result.success };
        } else {
            return { error: result?.error || 'An error occurred' };
        }
    };

    const handleDeleteTask = async (task) => {
        const result = await deleteTask(task);
        if (result?.success) {
            await fetchTasks();
            toast({
                title: "Success",
                variant: "success",
                description: result.success,
            });
        } else {
            toast({
                title: "Error",
                variant: "error",
                description: result.error,
            });
        }
    }

    const handleStatusChange = (status) => {
        setStatusFilter(status);
    };

    const handlePriorityChange = (priority) => {
        setPriorityFilter(priority);
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen w-full flex flex-col gap-6 px-4 py-20 md:py-20 md:px-16 bg-gradient-to-b from-secondary to-background">
                <div className='flex justify-between gap-6 py-4'>
                    <div>
                        <h2 className='font-semibold text-2xl'>Manage Your Tasks</h2>
                        <p className='text-foreground/70'>Create, manage or delete your tasks right here!</p>
                    </div>
                    <AddTask handleAddTask={handleAddTask} />
                </div>

                <div className='flex flex-col md:flex-row gap-6 w-full'>
                    <TaskListing
                        tasks={tasks}
                        loading={loading}
                        onStatusChange={handleStatusChange}
                        onPriorityChange={handlePriorityChange}
                        onSortChange={handleSortChange}
                        handleAddTask={handleAddTask}
                        handleDeleteTask={handleDeleteTask}
                    />

                    <TaskDnD tasks={tasks} updateTaskStatus={handleAddTask}/>
                </div>
            </div>
        </>
    )
}

export default Tasks