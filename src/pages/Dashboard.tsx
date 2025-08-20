import Header from '../components/Header'
import StatCard from '../components/StatCards';


export default function Dashboard() {
  return <div className="Dashboard">
            <Header/>
            <div className="stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'1rem', marginBottom:'1.2rem' }}>
                  <StatCard icon="fas fa-user-injured" label="New Patients" value="102" delta={{ value:"+4.2%", direction:"up" }} hint="vs last week" />
                  <StatCard icon="fas fa-calendar-check" label="Appointments Today" value="28" delta={{ value:"-2", direction:"down" }} />
                  <StatCard icon="fas fa-dollar-sign" label="Revenue" value="$12,430" delta={{ value:"+$840", direction:"up" }} />
                  <StatCard icon="fas fa-star" label="Satisfaction" value="4.8" delta={{ value:"0", direction:"flat" }} />
                  <StatCard icon="fas fa-star" label="Satisfaction" value="4.8" delta={{ value:"0", direction:"flat" }} />
                  
          </div>
        </div>;
}
