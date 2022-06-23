import Checkbox from 'components/Checkbox';
import Step from 'components/Step';
import StepsForm from 'components/StepsForm';

function App() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="shadow-2xl p-8 rounded-lg shadow-indigo-500/50 border-slate-100 border">
        <StepsForm title="My startup progress">
          <Step title="Foundation">
            <Checkbox name="virtualOffice" label="Setup virtual office" />
            <Checkbox name="missionVission" label="Set mission & vission" />
            <Checkbox name="businessName" label="Select business name" />
            <Checkbox name="buyDomains" label="Buy domains" />
          </Step>
          <Step title="Discovery">
            <Checkbox name="createRoadmap" label="Create roadmap" />
            <Checkbox name="competitorAnalysis" label="Competitor analysis" />
          </Step>
          <Step title="Delivery">
            <Checkbox name="releaseWebsite" label="Release marketing website" />
            <Checkbox name="releaseMvp" label="Release MVP" />
          </Step>
        </StepsForm>
      </div>
    </div>
  );
}

export default App;
