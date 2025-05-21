import { useEffect, useState } from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,

} from '@tanstack/react-table';
import { deleteTeacherApi, getAllTeachers } from '../api/teacherApi/TeacherApi';


type Person = {
    _id: number;
    name: string;
    email: string;
    subject: string
    // status: string;
};


// const defaultData: Person[] = [
//     { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Math' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Science' },
//     { id: 3, name: 'Bob Johnson', email: 'bob@example.com', subject: 'English' },
//     { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', subject: 'History' },
//     { id: 5, name: 'Michael Brown', email: 'michael@example.com', subject: 'Biology' },
//     { id: 6, name: 'Emily Davis', email: 'emily@example.com', subject: 'Physics' },
//     { id: 7, name: 'David Miller', email: 'david@example.com', subject: 'Chemistry' },
//     { id: 8, name: 'Jessica Wilson', email: 'jessica@example.com', subject: 'Art' },
//     { id: 9, name: 'Kevin Moore', email: 'kevin@example.com', subject: 'Music' },
//     { id: 10, name: 'Amanda Taylor', email: 'amanda@example.com', subject: 'Geography' },
//     { id: 11, name: 'Thomas Anderson', email: 'thomas@example.com', subject: 'Economics' },
//     { id: 12, name: 'Lisa Thomas', email: 'lisa@example.com', subject: 'Computer Science' },
// ];


const columnHelper = createColumnHelper<Person>();
const TeacherTable = () => {
    const [data, setData] = useState<Person[]>([]);

    

useEffect(()=>{
    const fetchData = async () =>{
        try {
            const response = await getAllTeachers()
            setData(response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchData()
},[])

const handleDelete = async (_id: number) =>{
    if(!_id){
        console.warn('No ID provided for deletion');
        return
    }
    try {
       const responseDelete =  await deleteTeacherApi(_id.toString())
       console.log('deleted item', responseDelete)
        setData(prevData => prevData.filter(person=> person._id !== _id))
    } catch (error:any) {
        console.error('Error deleting data:', error);
    }
   }
    const columns = [

        columnHelper.accessor('name', {
            header: 'Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('subject', {
            header: 'Subject',
            cell: info => info.getValue(),
        }),

        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: props => {
                const personId = props.row.original._id;

                return (
                    <div className='flex gap-2'>
                        <button
                            onClick={() => handleDelete(personId)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                        <button
                            // onClick={() => handleDelete(personId)}
                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Edit
                        </button>
                    </div>
                );
            },
        }),


    ];


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    });





   


    // const handleReset = () => {
    //     setData(defaultData);
    // };



    return (
        <div className="p-4">




            <div className="mb-4 flex gap-2">
                <button
                    // onClick={() => setData(defaultData)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    All
                </button>

                <button
                    // onClick={handleReset}
                    className="px-3 py-1 bg-yellow-100 rounded hover:bg-yellow-200 ml-auto"
                >
                    Reset Data
                </button>
            </div>


            <div className="overflow-x-auto border rounded">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-100">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="py-2 px-4 border-b text-left font-semibold"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="hover:bg-gray-50">
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className="py-2 px-4 border-b"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="py-4 px-4 text-center text-gray-500">
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                    <button
                        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <button
                        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                    <button
                        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </button>
                </div>

                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount() || 1}
                    </strong>
                </span>

                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value));
                    }}
                    className="px-2 py-1 border rounded"
                >
                    {[5, 10, 20].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default TeacherTable;