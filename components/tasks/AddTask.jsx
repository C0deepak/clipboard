import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import TaskForm from './TaskForm'

const AddTask = ({ handleAddTask }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Task <Plus className="ml-2 h-4 w-4" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add task</DialogTitle>
                    <DialogDescription>
                        Added tasks will be automatically update, Just click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <TaskForm handleAddTask={handleAddTask} />
            </DialogContent>
        </Dialog>
    )
}

export default AddTask