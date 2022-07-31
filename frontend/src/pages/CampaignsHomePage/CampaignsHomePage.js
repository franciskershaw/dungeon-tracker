import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchCampaign } from '../../queries/requests';

const CampaignsHomePage = () => {
  const [campaigns, setCampaigns] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const getCampaigns = () => {
    user.campaigns.forEach(async (campaign) => {
      const response = await fetchCampaign(user.token, campaign);
      setCampaigns([...campaigns, response]);
    });
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  useEffect(() => {
    console.log(campaigns);
  }, [campaigns]);

  return (
    <div>
      <h2>
        I am the Campaign page were you can see your campaigns and join/create
        new ones
      </h2>
    </div>
  );
};

export default CampaignsHomePage;
