const UserCard = ({ user }) => {
    const { initial, firstName, lastName, email, status, dob } = user;
    return (
      <div className="p-4 border rounded-lg shadow hover:shadow-lg">
        <h2 className="text-lg font-bold">{initial}</h2>
        <p>{firstName} {lastName}</p>
        <p>{email}</p>
        <p>Status: {status}</p>
        <p>Date of Birth: {dob}</p>
        <div className="flex gap-2 mt-2">
          <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
          <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
        </div>
      </div>
    );
  };
  
  const UserGrid = ({ users }) => {
    return (
      <div>
        <input 
          type="text" 
          placeholder="Search..." 
          className="border p-2 w-full mb-4 rounded"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <UserCard key={user.email} user={user} />
          ))}
        </div>
      </div>
    );
  };
  
  export default UserGrid;
  