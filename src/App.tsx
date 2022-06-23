import Checkbox from 'components/Checkbox';
import Step from 'components/Step';
import StepsForm from 'components/StepsForm';

function App() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="shadow-2xl p-8 rounded-lg shadow-indigo-500/50 border-slate-100 border">
        <StepsForm title="My startup progress">
          <Step title="Foundation">
            <Checkbox name="virtualOffice" label="Setup virtual office"></Checkbox>
            <Checkbox name="missionVission" label="Set mission & vission"></Checkbox>
            <Checkbox name="businessName" label="Select business name"></Checkbox>
            <Checkbox name="buyDomains" label="Buy domains"></Checkbox>
          </Step>
          <Step title="Discovery">
            <Checkbox name="createRoadmap" label="Create roadmap"></Checkbox>
            <Checkbox name="competitorAnalysis" label="Competitor analysis"></Checkbox>
          </Step>
          <Step title="Delivery">
            <Checkbox name="releaseWebsite" label="Release marketing website"></Checkbox>
            <Checkbox name="releaseMvp" label="Release MVP"></Checkbox>
          </Step>
        </StepsForm>
      </div>
    </div>
  );
}

export default App;
