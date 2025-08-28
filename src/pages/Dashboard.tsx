import Header from '../components/Header'
import StatCard from '../components/StatCards';
import Appointments, { AppointmentItem } from '../components/Appointments';
import QuickActions from '../components/QuickActions';
import '../styles/dashboard.css'
import PerformanceMetrics, { PerfMetric } from "../components/PerformanceMetrics";


export default function Dashboard() {
      
      const today: AppointmentItem[] = [
            { id:'1', patientFullName:'John Smith',   timeLabel:'9:00 AM',  title:'Regular Checkup', status:'confirmed', initials:'JS' },
            { id:'2', patientFullName:'Maria Davis',  timeLabel:'10:30 AM', title:'Follow-up',       status:'pending',   initials:'MD' },
            { id:'3', patientFullName:'Robert Wilson',timeLabel:'2:00 PM',  title:'Consultation',    status:'confirmed', initials:'RW' },
            { id:'4', patientFullName:'Lisa Brown',   timeLabel:'3:30 PM',  title:'Lab Results',     status:'completed', initials:'LB' },
            ];
    const metrics: PerfMetric[] = [
            { id:"acr",  label:"Appointment Completion Rate", valueLabel:"94%",  percent:94,  tone:"emerald", trend:{value:"+2.1%", direction:"up"},   series:[65,70,68,72,75,78,79,83,90,94] },
            { id:"pss",  label:"Patient Satisfaction Score",  valueLabel:"4.9/5",percent:98,  tone:"blue",    trend:{value:"+0.1",  direction:"up"},   series:[88,90,92,92,94,95,96,97,98,98] },
            { id:"rev",  label:"Revenue Growth",              valueLabel:"+18%", percent:78,  tone:"amber",   trend:{value:"+4%",   direction:"up"},   series:[22,30,35,40,48,58,63,70,75,78] },
            { id:"util", label:"Clinic Utilization",          valueLabel:"82%",  percent:82,  tone:"violet",  trend:{value:"-3%",   direction:"down"}, series:[80,82,85,87,86,84,83,82,83,82] },
            { id:"wait", label:"Average Wait Time",           valueLabel:"11 min",percent:55, tone:"red",     trend:{value:"-2m",   direction:"down"}, series:[22,21,20,19,18,16,15,14,13,11] },
            ];

  return <div className="Dashboard">
            {/* Header  */}
            <Header/>
            {/* stat cards  */}
            <div className="stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'1rem', marginBottom:'1.2rem' }}>
                  <StatCard icon="fas fa-user-injured" label="New Patients" value="102" delta={{ value:"+4.2%", direction:"up" }} hint="vs last week" />
                  <StatCard icon="fas fa-calendar-check" label="Appointments Today" value="28" delta={{ value:"-2", direction:"down" }} hint="vs last week"/>
                  <StatCard icon="fas fa-dollar-sign" label="Revenue" value="12,430 MAD" delta={{ value:"+$840", direction:"up" }} hint="vs last week"/>
                  <StatCard icon="fas fa-star" label="Satisfaction" value="4.8" delta={{ value:"0", direction:"flat" }} hint="overall satisfaction"/>           
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


                  <PerformanceMetrics metrics={metrics} />
            </div>

            
        </div>;
}
