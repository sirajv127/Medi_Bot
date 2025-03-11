import { motion } from 'framer-motion';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

function Dashboard() {
  // Sample data for charts
  const medicineData = [
    { name: 'Taken', value: 85 },
    { name: 'Missed', value: 15 }
  ];

  const diseaseData = [
    { name: 'Common Cold', count: 12 },
    { name: 'Migraine', count: 8 },
    { name: 'Allergies', count: 15 },
    { name: 'Flu', count: 6 }
  ];

  const appointmentData = [
    { month: 'Jan', appointments: 4 },
    { month: 'Feb', appointments: 6 },
    { month: 'Mar', appointments: 8 },
    { month: 'Apr', appointments: 5 },
    { month: 'May', appointments: 9 },
    { month: 'Jun', appointments: 7 }
  ];

  const healthTips = [
    {
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water daily to maintain good health.",
      icon: "💧"
    },
    {
      title: "Regular Exercise",
      description: "Aim for 30 minutes of moderate exercise most days of the week.",
      icon: "🏃‍♂️"
    },
    {
      title: "Balanced Diet",
      description: "Include a variety of fruits, vegetables, and whole grains in your diet.",
      icon: "🥗"
    },
    {
      title: "Quality Sleep",
      description: "Get 7-9 hours of quality sleep each night for optimal health.",
      icon: "😴"
    }
  ];

  const upcomingAppointments = [
    {
      doctor: "Dr. Sarah Johnson",
      date: "2024-02-15",
      time: "10:00 AM",
      type: "General Checkup"
    },
    {
      doctor: "Dr. Michael Chen",
      date: "2024-02-18",
      time: "2:30 PM",
      type: "Follow-up"
    },
    {
      doctor: "Dr. Emily Brown",
      date: "2024-02-20",
      time: "11:15 AM",
      type: "Consultation"
    }
  ];

  const COLORS = ['#4F46E5', '#EF4444', '#10B981', '#F59E0B'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Health Dashboard</h1>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Total Medicines</h3>
              <p className="mt-2 text-3xl font-bold text-indigo-600">24</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Active Reminders</h3>
              <p className="mt-2 text-3xl font-bold text-indigo-600">8</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
              <p className="mt-2 text-3xl font-bold text-indigo-600">3</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Health Score</h3>
              <p className="mt-2 text-3xl font-bold text-indigo-600">85%</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Medicine Adherence</h2>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={medicineData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {medicineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Disease Distribution</h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={diseaseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Appointment Trends</h2>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="appointments" stroke="#4F46E5" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Health Tips Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Daily Health Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {healthTips.map((tip, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="text-4xl mb-4">{tip.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Appointments</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {upcomingAppointments.map((appointment, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.doctor}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;