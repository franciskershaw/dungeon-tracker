import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchCampaign } from '../../queries/requests';

const CampaignsHomePage = () => {
  const [campaigns, setCampaigns] = useState([]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(campaigns);
  }, [campaigns]);

  const getCampaigns = () => {
    user.campaigns.forEach(async (campaign) => {
      const response = await fetchCampaign(user.token, campaign);
      setCampaigns([...campaigns, response]);
    });
  };

  return (
    <div className="page-content">
      <section id="heading" className='mt-5 mb-2 md:mb-8 pl-3 md:pl-14 md:mt-20 lg:mt-24 lg:mb-14'>
        <h2 className="text-2xl md:text-3xl lg:text-4xl">
          Welcome, {user.name}
        </h2>
      </section>

      <section id="buttons" className='flex w-full md:items-center justify-center'>
        <button className='btn flex-grow md:flex-grow-0 md:mr-5 md:text-xl lg:text-2xl lg:mr-24 lg:p-5'>Join Campaign</button>
        <button className='btn flex-grow md:flex-grow-0 md:ml-5 md:text-xl lg:text-2xl lg:ml-24 lg:p-5'>Create Campaign</button>
      </section>

      <section id="currentCampaigns"></section>
    </div>
  );
};

export default CampaignsHomePage;
