'use server'

import { db } from "@/lib/db"
import { TaskSchema } from "../schemas"

export const addOrUpdateTask = async ({ userId, values }) => {
    const validatedFields = TaskSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: 'Invalid fields!' }
    }

    try {
        const { id } = validatedFields.data;

        if (id) {
            const updateResult = await updateTask(validatedFields.data);
            return updateResult;
        } else {
            const addResult = await addTask(userId, validatedFields.data);
            return addResult;
        }
    } catch (error) {
        console.error('Error updating/storing task:', error);
        return { error: 'Error updating/storing task' };
    }
}

export const getTask = async (userId) => {
    try {
        const allTask = await db.task.findMany({
            where: { userId },
        });

        return allTask || null;
    } catch (error) {
        console.error('Error fetching your tasks:', error);
        return { error: 'Error fetching your tasks' };
    }
};

export const updateTask = async (taskData) => {
    const { id, ...updatedData } = taskData;
    try {
        await db.task.update({
            where: { id: id },
            data: {
                ...updatedData,
                updatedAt: new Date(),
            },
        });

        return { success: 'Task updated successfully!' };
    } catch (error) {
        console.error('Error updating task:', error);
        return { error: 'Error updating task' };
    }
};

export const addTask = async (userId, taskData) => {
    try {
        await db.task.create({
            data: {
                userId,
                ...taskData,
            },
        });

        return { success: 'Task Added successfully!' };
    } catch (error) {
        console.error('Error adding task:', error);
        return { error: 'Error adding task' };
    }
};

export const deleteTask = async (task) => {
    try {
        await db.task.delete({
            where: { id: task.id },
        });

        return { success: 'Task deleted successfully!' };
    } catch (error) {
        console.error('Error deleting your task:', error);
        return { error: 'Error deleting your task' };
    }
};