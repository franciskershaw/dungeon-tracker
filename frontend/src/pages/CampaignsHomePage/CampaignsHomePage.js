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
    <div className="container page-content">
      <h2 className="font-roboto text-xl md:text-2xl lg:text-3xl">
        Welcome, {user.name} 
      </h2>
    </div>
  );
};

export default CampaignsHomePage;
