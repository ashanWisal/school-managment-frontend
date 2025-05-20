import { useState } from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,

} from '@tanstack/react-table';


type Person = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    // status: string;
};


const defaultData: Person[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 25 },
    { id: 2, firstName: 'Jane', lastName: 'Smith', age: 32 },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 45 },
    { id: 4, firstName: 'Sarah', lastName: 'Williams', age: 29 },
    { id: 5, firstName: 'Michael', lastName: 'Brown', age: 38 },
    { id: 6, firstName: 'Emily', lastName: 'Davis', age: 27 },
    { id: 7, firstName: 'David', lastName: 'Miller', age: 41 },
    { id: 8, firstName: 'Jessica', lastName: 'Wilson', age: 33 },
    { id: 9, firstName: 'Kevin', lastName: 'Moore', age: 36 },
    { id: 10, firstName: 'Amanda', lastName: 'Taylor', age: 30 },
    { id: 11, firstName: 'Thomas', lastName: 'Anderson', age: 44 },
    { id: 12, firstName: 'Lisa', lastName: 'Thomas', age: 31 },
];


const columnHelper = createColumnHelper<Person>();

const TeacherTable = () => {

    const [data, setData] = useState<Person[]>(defaultData);



    const columns = [
        columnHelper.accessor('id', {
            header: 'ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('firstName', {
            header: 'First Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('lastName', {
            header: 'Last Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('age', {
            header: 'Age',
            cell: info => info.getValue(),
        }),

        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: props => {
                const personId = props.row.original.id;
                return (
                    <div className='flex gap-2'>
                        <button
                            onClick={() => handleDelete(personId)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => handleDelete(personId)}
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





    const handleDelete = (id: number) => {
        setData(prevData => prevData.filter(person => person.id !== id));
    };


    const handleReset = () => {
        setData(defaultData);
    };



    return (
        <div className="p-4">




            <div className="mb-4 flex gap-2">
                <button
                    onClick={() => setData(defaultData)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    All
                </button>

                <button
                    onClick={handleReset}
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