export default function Page() {
    return (
        <div>
            <div className="p-4 bg-white shadow-md">Dashboard</div>
            <div className="p-8 bg-white shadow-md rounded-lg m-4">
                <h1 className="font-semibold text-lg">Recent Events</h1>
                <table>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Name</td>
                            <td>Location</td>
                            <td>Category</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Event content */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
