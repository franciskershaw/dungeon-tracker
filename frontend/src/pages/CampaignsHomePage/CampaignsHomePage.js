import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchCampaign } from '../../queries/requests';

const CampaignsHomePage = () => {
  const [campaigns, setCampaigns] = useState([]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getCampaigns();
  }, []);

  useEffect(() => {
    console.log(campaigns)
  },[campaigns])

  const getCampaigns = () => {
    user.campaigns.forEach(async (campaign) => {
      const response = await fetchCampaign(user.token, campaign);
      setCampaigns([...campaigns, response]);
    });
  };

  return (
    <div>
      <h2>
        Welcome, {user.name}
      </h2>
    </div>
  );
};

export default CampaignsHomePage;
