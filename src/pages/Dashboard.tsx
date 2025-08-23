import Header from '../components/Header'
import StatCard from '../components/StatCards';
import Appointments, { AppointmentItem } from '../components/Appointments';
import QuickActions from '../components/QuickActions';
import '../styles/dashboard.css'


export default function Dashboard() {
      
      const today: AppointmentItem[] = [
            { id:'1', patientFullName:'John Smith',   timeLabel:'9:00 AM',  title:'Regular Checkup', status:'confirmed', initials:'JS' },
            { id:'2', patientFullName:'Maria Davis',  timeLabel:'10:30 AM', title:'Follow-up',       status:'pending',   initials:'MD' },
            { id:'3', patientFullName:'Robert Wilson',timeLabel:'2:00 PM',  title:'Consultation',    status:'confirmed', initials:'RW' },
            { id:'4', patientFullName:'Lisa Brown',   timeLabel:'3:30 PM',  title:'Lab Results',     status:'completed', initials:'LB' },
            ];

  return <div className="Dashboard">
            {/* Header  */}
            <Header/>
            {/* stat cards  */}
            <div className="stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'1rem', marginBottom:'1.2rem' }}>
                  <StatCard icon="fas fa-user-injured" label="New Patients" value="102" delta={{ value:"+4.2%", direction:"up" }} hint="vs last week" />
                  <StatCard icon="fas fa-calendar-check" label="Appointments Today" value="28" delta={{ value:"-2", direction:"down" }} />
                  <StatCard icon="fas fa-dollar-sign" label="Revenue" value="$12,430" delta={{ value:"+$840", direction:"up" }} />
                  <StatCard icon="fas fa-star" label="Satisfaction" value="4.8" delta={{ value:"0", direction:"flat" }} />           
            </div>
            <div className='dashboard-row'>
                  {/*   Today Appointments*/}
                  <Appointments className="appointments" items={today} onViewAll={() => console.log('view all')}   />
                  {/* Quick Actions */}
                  <QuickActions
                        columns={2}
                        actions={[
                        { label: "New Appointment", icon: "fas fa-plus", description: "Schedule a new patient appointment" },
                        { label: "Add Patient", icon: "fas fa-user-plus", description: "Register a new patient" },
                        { label: "Write Prescription", icon: "fas fa-prescription", description: "Create new prescription" },
                        { label: "Medical Records", icon: "fas fa-file-medical-alt", description: "View patient history" },
                        ]}
                        />


            </div>

            
        </div>;
}
