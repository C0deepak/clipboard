'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AlarmClock, Circle, CircleCheck, DeleteIcon, Edit, Trash } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import TaskSkeleton from './TaskSkeleton';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import TaskForm from './TaskForm';

const TaskListing = ({ tasks, loading, onStatusChange, onPriorityChange, onSortChange, handleAddTask, handleDeleteTask }) => {

    const getBadgeStyles = (type, value) => {
        const styles = {
            priority: {
                LOW: 'border border-yellow-400 text-yellow-400',
                MEDIUM: 'border border-orange-400 text-orange-400',
                HIGH: 'border border-red-400 text-red-400',
            },
            status: {
                TODO: 'border border-blue-400 text-blue-400',
                PROGRESS: 'border border-amber-400 text-amber-400',
                COMPLETED: 'border border-green-400 text-green-400',
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
            <CardHeader className='flex flex-row space-y-0 items-center gap-4'>
                <Select onValueChange={(e) => onStatusChange(e)}>
                    <SelectTrigger className='w-fit'>
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="TODO">To Do</SelectItem>
                        <SelectItem value="PROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={(e) => onPriorityChange(e)}>
                    <SelectTrigger className='w-fit'>
                        <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={(e) => onSortChange(e)}>
                    <SelectTrigger className='w-fit'>
                        <SelectValue placeholder="Due Date" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">Asc</SelectItem>
                        <SelectItem value="desc">Desc</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Table>
                    <TableCaption>A list of your recent Tasks.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-40">Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ?
                            <>
                                <TableRow>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                    <TableCell><TaskSkeleton /> </TableCell>
                                </TableRow>
                            </>
                            :
                            tasks?.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell className="font-medium">{task.title}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${getBadgeStyles('status', task.status)}`}>
                                            {getDisplayText('status', task.status)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${getBadgeStyles('priority', task.priority)}`}>
                                            {getDisplayText('priority', task.priority)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right flex items-center justify-end gap-2">
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button variant='ghost' className='p-1 h-6'><Edit className='h-4 w-4' /></Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit task</DialogTitle>
                                                    <DialogDescription>
                                                        Save when you&apos;re done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <TaskForm handleAddTask={handleAddTask} existingTask={task} />
                                            </DialogContent>
                                        </Dialog>
                                        <Button variant='ghost' className='p-1 h-6' onClick={() => handleDeleteTask(task)}><Trash className='h-4 w-4'/></Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default TaskListing