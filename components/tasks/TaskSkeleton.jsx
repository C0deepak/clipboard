import React from 'react'
import { Skeleton } from '../ui/skeleton'

const TaskSkeleton = () => {
    return (
        <div className="flex items-center space-y-2">
            <Skeleton className="h-4 w-full rounded-full" />
        </div>
    )
}

export default TaskSkeleton